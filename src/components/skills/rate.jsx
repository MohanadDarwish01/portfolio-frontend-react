import style from './index.module.css';


export default function RateSkill ({ percentage, label }) {
    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div id={style.skill}>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="var(--dark)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="var(--yellow)" // green
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="fill-white text-xl font-bold"
          >
            {percentage}%
          </text>
        </svg>
        <span className="mt-2 text-sm">{label}</span>
      </div>
    );
  };