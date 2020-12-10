#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#include <HTTPClient.h>
WiFiMulti wifiMulti;

String url = "http://ec2-3-80-148-124.compute-1.amazonaws.com:8000/safety_room/update?table=table3&";

const int trigPin1 = 16;
const int echoPin1 = 17;
const int trigPin2 = 22;
const int echoPin2 = 23;
const int trigPin3 = 18;
const int echoPin3 = 19;
const int motionPin = 32;

void setup() {
  pinMode (trigPin1, OUTPUT);
  pinMode (echoPin1, INPUT);
  pinMode (trigPin2, OUTPUT);
  pinMode (echoPin2, INPUT);
  pinMode (trigPin3, OUTPUT);
  pinMode (echoPin3, INPUT);
  pinMode (motionPin,INPUT);
  
  // Start the Serial Monitor
  Serial.begin(115200);

  wifiMulti.addAP("wifi", "pwd");
}

void httpGet(int action, long distance1, long distance2, long distance3) {
  String new_url = url + "action=" + action + "&distance1=" + distance1 + "&distance2=" + distance2 + "&distance3=" + distance3;
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
  long duration, distance1, distance2, distance3, action;
  int action_val;
  
  digitalWrite (trigPin1, HIGH); // trigPin에서 초음파 발생
  delayMicroseconds(10); 
  digitalWrite (trigPin1, LOW);

  duration = pulseIn (echoPin1, HIGH); // echoPin pulse 유지 시간 저장
  distance1 = 340 * duration / 1000 / 2; // distance 계산 (초음파는 340m/s, 왕복거리니까 2로 나누어줌), 1000000 microsecond = 1s, 1000mm = 1m

  digitalWrite (trigPin2, HIGH); // trigPin에서 초음파 발생
  delayMicroseconds(10); 
  digitalWrite (trigPin2, LOW);
  
  duration = pulseIn (echoPin2, HIGH); // echoPin pulse 유지 시간 저장
  distance2 = 340 * duration / 1000 / 2; // distance 계산 (초음파는 340m/s, 왕복거리니까 2로 나누어줌), 1000000 microsecond = 1s, 1000mm = 1m
  
  digitalWrite (trigPin3, HIGH); // trigPin에서 초음파 발생
  delayMicroseconds(10); 
  digitalWrite (trigPin3, LOW);
  
  duration = pulseIn (echoPin3, HIGH); // echoPin pulse 유지 시간 저장
  distance3 = 340 * duration / 1000 / 2; // distance 계산 (초음파는 340m/s, 왕복거리니까 2로 나누어줌), 1000000 microsecond = 1s, 1000mm = 1m

  action = digitalRead (motionPin);
  if (action == HIGH) {
    action_val = 1;
  }
  else action_val = 0;
  
  httpGet (action, distance1, distance2, distance3);
  delay(2000);
}
