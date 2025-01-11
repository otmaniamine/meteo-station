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

void setup() {
  Serial.begin(115200);
  delay(500);

  dht.begin(); // Start reading DHT11 sensor
  delay(500);

  WiFi.begin(ssid, password); // Connect to WiFi
  Serial.println("");

  pinMode(ON_Board_LED, OUTPUT); // Set LED as output
  digitalWrite(ON_Board_LED, HIGH); // Turn off LED

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
}

void loop() {
  // Reading temperature and humidity
  int h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    delay(500);
    return;
  }

  String Temp = "Temperature: " + String(t) + " °C";
  String Humi = "Humidity: " + String(h) + " %";
  Serial.println(Temp);
  Serial.println(Humi);

  sendData(t, h); // Call sendData subroutine
  delay(10000);   // Send data every 10 seconds
}

// Subroutine for sending data to Google Sheets
void sendData(float tem, int hum) {
  if (WiFi.status() == WL_CONNECTED) { // Ensure WiFi is connected
    HTTPClient http;

    String string_temperature = String(tem);
    String string_humidity = String(hum);
    String url = "https://" + String(host) + "/macros/s/" + GAS_ID + "/exec?temperature=" + string_temperature + "&humidity=" + string_humidity;

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
