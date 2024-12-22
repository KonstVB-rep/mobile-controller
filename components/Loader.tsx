import * as React from "react";
// import { SVGProps } from "react"
import Svg, { LinearGradient, Stop, Path, SvgProps, G } from "react-native-svg";
const Loader = (props: SvgProps) => (
  <Svg width={84} height={84} viewBox="0 0 128 128" {...props}>
    <G>
      <Path
        fill="#c1e8f2"
        d="M64.33.25a16 16 0 0 1 16 16c0 4.46-4.93 11.74-9.1 14.62-5.28 3.62-6.56 17.7-6.56 17.7s-.9-13.92-7.24-18.03c-5.4-3.5-9.1-9.8-9.1-14.3a16 16 0 0 1 16-16z"
      />
      <Path
        fill="#39b6d5"
        d="M109.311 19.155a16 16 0 0 1 0 22.628c-3.153 3.153-11.787 4.815-16.772 3.903-6.293-1.174-17.155 7.877-17.155 7.877s9.207-10.48 7.63-17.868c-1.343-6.294.495-13.365 3.677-16.547a16 16 0 0 1 22.627 0zM127.75 64.33a16 16 0 0 1-16 16c-4.46 0-11.74-4.93-14.62-9.1-3.62-5.28-17.7-6.56-17.7-6.56s13.92-.9 18.03-7.24c3.5-5.4 9.8-9.1 14.3-9.1a16 16 0 0 1 16 16zM108.845 109.311a16 16 0 0 1-22.628 0c-3.153-3.153-4.815-11.787-3.903-16.772 1.174-6.293-7.877-17.155-7.877-17.155s10.48 9.207 17.868 7.63c6.294-1.343 13.365.495 16.547 3.677a16 16 0 0 1 0 22.627zM63.67 127.75a16 16 0 0 1-16-16c0-4.46 4.93-11.74 9.1-14.62 5.28-3.62 6.56-17.7 6.56-17.7s.9 13.92 7.24 18.03c5.4 3.5 9.1 9.8 9.1 14.3a16 16 0 0 1-16 16zM18.689 108.845a16 16 0 0 1 0-22.628c3.153-3.153 11.787-4.815 16.772-3.903 6.293 1.174 17.155-7.877 17.155-7.877s-9.207 10.48-7.63 17.868c1.343 6.294-.495 13.365-3.677 16.547a16 16 0 0 1-22.627 0zM.25 63.67a16 16 0 0 1 16-16c4.46 0 11.74 4.93 14.62 9.1 3.62 5.28 17.7 6.56 17.7 6.56s-13.92.9-18.03 7.24c-3.5 5.4-9.8 9.1-14.3 9.1a16 16 0 0 1-16-16zM19.155 18.689a16 16 0 0 1 22.628 0c3.153 3.153 4.815 11.787 3.903 16.772-1.174 6.293 7.877 17.155 7.877 17.155s-10.48-9.207-17.868-7.63c-6.294 1.343-13.365-.495-16.547-3.677a16 16 0 0 1 0-22.627z"
      />
    </G>
  </Svg>
);
export default Loader;
