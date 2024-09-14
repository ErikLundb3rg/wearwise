import requests
import json

def get_weather(city):
    api_key = "72cd0b4bbf5dccf66aa2301947dc9803"  # Replace with your OpenWeatherMap API key
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

    response = requests.get(url)

    data = json.loads(response.text)

    if response.status_code == 200:
        temperature = data['main']['temp']
        description = data['weather'][0]['description']
        city_name = data['name']

        return (f"The current weather in {city_name} is {description} "
                f"with a temperature of {round((temperature-273.15), 2)} degrees Celsius.")
    else:
        return "Error fetching weather data."

# Example usage
city = "Waterloo, CA"
weather_string = get_weather(city)
print(weather_string)
