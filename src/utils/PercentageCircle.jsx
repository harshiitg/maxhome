import React from "react";
export class PercentageCircle extends React.Component {
  constructor(props) {
    super(props);
    const percent = Math.floor(Math.max(Math.min(this.props.percent, 100), 0));
    const percentText = this.props.duration === 0 ? percent : 0;
    this.state = {
      percentText,
      percent,
    };
  }

  componentDidMount() {
    const divide = this.props.duration / this.state.percent;
    const unit = Math.ceil(this.props.offset / divide);
    const time = this.state.percent > 0 ? divide * unit : 0;
    if (time) {
      const addPer = () => {
        const { percent, percentText } = this.state;
        this.timeout = setTimeout(() => {
          const newPercentText =
            percentText + unit > percent ? percent : percentText + unit;
          return this.setState({ percentText: newPercentText }, () => {
            if (newPercentText < percent) {
              return addPer();
            }
            return clearTimeout(this.timeout);
          });
        }, time);
      };
      addPer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeout = null;

  render() {
    const {
      state: { percent, percentText },
      props: { circleSize, duration, fontColor, circleColor, circleInnerColor },
    } = this;
    const viewbox = `0 0 ${circleSize} ${circleSize}`;
    const strokeWidth = circleSize / 14;
    const diameter = circleSize - strokeWidth;
    const radius = diameter / 2;
    const circumference = 2 * Math.PI * radius;
    const fakePercent = percent === 98 || percent === 99 ? 97 : percent;
    const pCircumference = (circumference * fakePercent) / 100;
    const x = circleSize / 2;
    const y = (circleSize - diameter) / 2;
    const fontSize = circleSize / 3.73;
    const textX = circleSize / 2 - fontSize / 1.8;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@-webkit-keyframes progress${circleSize}{0%{stroke-dasharray: 0 ${circumference};}}`,
      styleSheet.cssRules.length
    );
    const d = `
        M ${x} ${y}
        a ${radius} ${radius} 0 0 1 0 ${diameter}
        a ${radius} ${radius} 0 0 1 0 ${diameter * -1}
      `;
    return (
      <div
        id="progress"
        style={{
          position: "relative",
          width: circleSize,
          height: circleSize,
          animation: `progress${circleSize} ${duration}ms ease-out forwards`,
        }}
      >
        <svg viewBox={viewbox} stroke={circleColor}>
          <path
            style={{
              fill: "none",
              stroke: circleInnerColor,
              strokeWidth,
            }}
            d={d}
          />
          {percent && (
            <path
              style={{
                fill: "none",
                strokeWidth,
                strokeLinecap: "square",
                animation: `progress${circleSize} ${duration}ms ease-out forwards`,
              }}
              d={d}
              strokeDasharray={[pCircumference, circumference]}
            />
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            color: fontColor,
            top: "18%",
            left: "0%",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          {percentText}%
          {/* <span style={{ fontSize: fontSize / 2 }}>%</span> */}
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            color: fontColor,
            top: "49%",
            left: "0%",
            fontSize: "10px",
          }}
        >
          Match
        </div>
      </div>
    );
  }
}

PercentageCircle.defaultProps = {
  circleSize: 168,
  percent: 67,
  duration: 1000,
  offset: 100,
  fontColor: "#77A977",
  circleColor: " #77A977",
  circleInnerColor: "#d9f5ea",
};
