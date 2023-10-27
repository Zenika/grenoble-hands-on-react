/* eslint-disable react/prop-types */
/**
 * @param weather {String}
 * @returns {JSX.Element}
 * @constructor
 */
export const DetailedWeatherImage = ({ weather }) => {
  const { image } = getDetailedWeatherIcon()

  function getDetailedWeatherIcon() {
    const latestLetter = weather[weather.length - 1]

    switch (latestLetter) {
      case 'y':
        return {
          image: weather.slice(0, weather.length - 3)
        }
      case 't':
        return {
          image: weather.slice(0, weather.length - 5)
        }
    }
  }

  return (
    <img
      src={`http://www.7timer.info/img/misc/about_civil_${image}.png`}
      alt="meteo_image"
      className="cropped-image-day"
      width={80}
    />
  )
}
