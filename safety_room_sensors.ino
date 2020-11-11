#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#include <HTTPClient.h>
WiFiMulti wifiMulti;

String url = "http://ec2-3-80-148-124.compute-1.amazonaws.com:8000/safety_room/update?";

const int trigPin = 23;
const int echoPin = 22;
const int motionPin = 5;
const int irPin = 16;

void setup() {
  pinMode (trigPin, OUTPUT);
  pinMode (echoPin,INPUT);
  pinMode (motionPin,INPUT);
  
  // Start the Serial Monitor
  Serial.begin(115200);

  //wifiMulti.addAP("wifi-name", "wifi-pwd");
}

void httpGet(long distance, int motion) {
  String new_url = url + "distance=" + distance + "&motion=" + motion;
  Serial.println(new_url);
  if((wifiMulti.run() == WL_CONNECTED)) {
    HTTPClient http;
    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(new_url); //HTTP
  
    Serial.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();
    
    // httpCode will be negative on error
    if(httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
      
      // file found at server
      if(httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }
    else Serial.println("NO WIFI");
}

void loop() { 
  long duration, distance, irDistance;
  int motion, motion_val;
  float volts;
  
  digitalWrite (trigPin, HIGH); // trigPin에서 초음파 발생
  delayMicroseconds(10); 
  digitalWrite (trigPin, LOW);

  duration = pulseIn (echoPin, HIGH); // echoPin pulse 유지 시간 저장
  distance = 340 * duration / 1000 / 2; // distance 계산 (초음파는 340m/s, 왕복거리니까 2로 나누어줌), 1000000 microsecond = 1s, 1000mm = 1m

  motion = digitalRead (motionPin);
  if (motion == HIGH) {
    motion_val = 1;
  }
  else motion_val = 0;

  volts = analogRead (irPin) * 0.0048828125;
  irDistance = 13 * pow (volts, -1);

  Serial.println ("%ld\n", irDistance);
  
  httpGet (distance, motion_val);
  delay(2000);
}
