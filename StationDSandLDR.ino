#include <WiFi.h> // ESP32 WiFi library
#include <HTTPClient.h> // HTTP client for ESP32
#include "DHT.h"

#define DHTTYPE DHT11 // Type of the temperature sensor
const int DHTPin = 5; // The pin used for the DHT11 sensor is Pin D1 = GPIO5
DHT dht(DHTPin, DHTTYPE); // Initialize DHT sensor: DHT dht(Pin_used, Type_of_DHT_Sensor)

#define ON_Board_LED 2  // Define an onboard LED for WiFi status

const char* ssid = "T[10]"; // Your WiFi SSID
const char* password = "911amine";    // Your WiFi password

//----------------------------------------Host & Script ID
const char* host = "script.google.com";
String GAS_ID = "AKfycbzUciUEvTM0dgRmWjCLryqXRygH3yKKxMQofiyi8Un1Lx8isFdLwFiY2z_Ut_76Xd7XOg"; // Spreadsheet Script ID

// Pins for Hall effect sensors
const int hallPinEast = 22;  
const int hallPinNorth = 15;
const int hallPinWest = 18;  
const int hallPinSouth = 21;

// Pin for wind speed sensor
const int hallPinSpeed = 13;

// Pin for LDR
const int ldrPin = 4;
int sensorValue =66;
// Wind speed constants
const float vaneDiameter = 0.29; // Diameter of the vane in meters (29 cm)
const float vaneCircumference = vaneDiameter * 3.1415; // Circumference in meters
const float anemometerFactor = 2.5; // Efficiency factor

// Variables for wind speed
volatile int rotationCount = 0; // Counter for rotations
unsigned long startTime = 0;    // Start time for measuring period

void IRAM_ATTR countRotation() {
  rotationCount++;
}

void setup() {
  Serial.begin(115200);
  delay(500);

  dht.begin(); // Start reading DHT11 sensor
  delay(500);

  WiFi.begin(ssid, password); // Connect to WiFi
  Serial.println("");

  pinMode(ON_Board_LED, OUTPUT); // Set LED as output
  digitalWrite(ON_Board_LED, HIGH); // Turn off LED

  pinMode(hallPinEast, INPUT_PULLUP);
  pinMode(hallPinNorth, INPUT_PULLUP);
  pinMode(hallPinWest, INPUT_PULLUP);
  pinMode(hallPinSouth, INPUT_PULLUP);

  pinMode(hallPinSpeed, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(hallPinSpeed), countRotation, RISING);

  pinMode(ldrPin, INPUT);

  //----------------------------------------Wait for connection
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    digitalWrite(ON_Board_LED, LOW); // Flashing LED while connecting
    delay(250);
    digitalWrite(ON_Board_LED, HIGH);
    delay(250);
  }
  digitalWrite(ON_Board_LED, HIGH); // Turn off LED when connected
  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  startTime = millis();
}

void loop() {
  int sensorValue = analogRead(ldrPin);
  // Reading temperature and humidity
  int h = dht.readHumidity();
  float t = dht.readTemperature();
  String windDirection = readWindDirection();

  // Calculate wind speed
  float windSpeed = calculateWindSpeed();

  // Read luminosity

  Serial.print("sensorValue  ");
  Serial.println(sensorValue);
  float luminosity = 100.0 - ((float)sensorValue / 4095.0) * 100.0; 
  Serial.print("Value 1 ");
  Serial.println(luminosity);
  luminosity = constrain(luminosity, 0.0, 100.0);
  Serial.print("Value 2 ");
  Serial.println(luminosity);

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    delay(500);
    return;
  }

  String Temp = "Temperature: " + String(t) + " °C";
  String Humi = "Humidity: " + String(h) + " %";
  String Speed = "Wind Speed: " + String(windSpeed) + " m/s";
  String Lum = "Luminosity: " + String(luminosity) + " %";
  Serial.println(Temp);
  Serial.println(Humi);
  Serial.println(Speed);
  Serial.println(Lum);
  Serial.println("Wind Direction: " + windDirection);

  sendData(t, h, luminosity, windDirection, windSpeed); // Call sendData subroutine
  delay(10000);   // Send data every 10 seconds
}

// Subroutine for reading wind direction
String readWindDirection() {
  int eastState = !digitalRead(hallPinEast);
  int northState = !digitalRead(hallPinNorth);
  int westState = !digitalRead(hallPinWest);
  int southState = !digitalRead(hallPinSouth);

  if (eastState && northState) return "N-E";
  if (eastState && southState) return "S-E";
  if (southState && westState) return "S-W";
  if (westState && northState) return "N-W";
  if (eastState) return "East";
  if (westState) return "West";
  if (southState) return "South";
  if (northState) return "North";
  return "None";
}

// Subroutine for calculating wind speed
float calculateWindSpeed() {
  unsigned long currentTime = millis();
  if (currentTime - startTime >= 10000) {
    float rotationsPerSecond = rotationCount / 10.0;
    float windSpeed = rotationsPerSecond * vaneCircumference * anemometerFactor;

    // Reset for the next measurement period
    rotationCount = 0;
    startTime = currentTime;

    return windSpeed;
  }
  return 0.0;
}

// Subroutine for sending data to Google Sheets
void sendData(float tem, int hum, float lum, String windDir, float windSpeed) {
  if (WiFi.status() == WL_CONNECTED) { // Ensure WiFi is connected
    HTTPClient http;

    String string_temperature = String(tem);
    String string_humidity = String(hum);
    String string_luminosity = String(lum);
    String string_windSpeed = String(windSpeed);
    String url = "https://" + String(host) + "/macros/s/" + GAS_ID + "/exec?temperature=" + string_temperature + "&humidity=" + string_humidity + "&luminosity=" + string_luminosity + "&wind_direction=" + windDir + "&wind_speed=" + string_windSpeed;

    Serial.print("Sending data to: ");
    Serial.println(url);

    http.begin(url); // Specify the URL
    int httpCode = http.GET(); // Send HTTP GET request

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP Response:");
      Serial.println(payload);
    } else {
      Serial.print("Error in HTTP request: ");
      Serial.println(http.errorToString(httpCode));
    }
    http.end(); // Close connection
  } else {
    Serial.println("WiFi disconnected!");
  }
}
