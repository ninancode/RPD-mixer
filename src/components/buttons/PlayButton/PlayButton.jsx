import './PlayButton.css';

const PlayButton = ({ 
  size = 30,
  circleColor = '#9496E5'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill={circleColor} />
      <path
        d="M22 18L42 30L22 42V18Z"
        fill="#EDEDED"
      />
    </svg>
  );
};

export default PlayButton;