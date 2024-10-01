interface SwitchProps {
  isOn: boolean; // Whether the switch is toggled on or off
  onToggle: () => void; // Callback to handle toggle state
  onColor?: string; // Background color when switch is on
  offColor?: string; // Background color when switch is off
  circleColor?: string; // Color of the circle
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  isOn,
  onToggle,
  onColor = 'bg-green-500',
  offColor = 'bg-gray-300',
  circleColor = 'bg-white',
  className = ''
}) => {
  return (
    <div
      onClick={onToggle}
      className={`inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
        isOn ? onColor : offColor
      } ${
        className ? className : ''
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform rounded-full transition-transform duration-300 ease-in-out ${circleColor} ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );
};
