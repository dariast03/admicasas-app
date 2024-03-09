import * as React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { Path, Defs, G, Use, Circle, Mask } from "react-native-svg";
import CONSTANTS from "expo-constants";

function SvgComponent(props: any) {
  const { height, width } = useWindowDimensions();
  return (
    // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1500" {...props}>
    //   <Path fill="#282475" d="M0 0H2000V1500H0z" />
    //   <Defs>
    //     <RadialGradient id="c" gradientUnits="objectBoundingBox">
    //       <Stop offset={0} stopColor="#4F46E5" />
    //       <Stop offset={1} stopColor="#282475" />
    //     </RadialGradient>
    //     <LinearGradient
    //       id="a"
    //       gradientUnits="userSpaceOnUse"
    //       x1={0}
    //       y1={750}
    //       x2={1550}
    //       y2={750}
    //     >
    //       <Stop offset={0} stopColor="#3c35ad" />
    //       <Stop offset={1} stopColor="#282475" />
    //     </LinearGradient>
    //     <Path
    //       id="b"
    //       fill="url(#a)"
    //       d="M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6-24.1 96-57.4 189.4-99.3 278.6-41.9 89.2-92.4 174.1-150.3 253.3-58 79.2-123.4 152.6-195.1 219-71.7 66.4-149.6 125.8-232.2 177.2-82.7 51.4-170.1 94.7-260.7 129.1-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6 93.6-20.2 185-49.5 272.5-87.2 87.6-37.7 171.3-83.8 249.6-137.3 78.4-53.5 151.5-114.5 217.9-181.7 66.5-67.2 126.4-140.7 178.6-218.9 52.3-78.3 96.9-161.4 133-247.9 36.1-86.5 63.8-176.2 82.6-267.6 18.8-91.4 28.6-184.4 29.6-277.4.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 .7 0 1.3-.1 2l.1.1z"
    //     />
    //     <G id="d">
    //       <Use href="#b" transform="rotate(60) scale(.12)" />
    //       <Use href="#b" transform="rotate(10) scale(.2)" />
    //       <Use href="#b" transform="rotate(40) scale(.25)" />
    //       <Use href="#b" transform="rotate(-20) scale(.3)" />
    //       <Use href="#b" transform="rotate(-30) scale(.4)" />
    //       <Use href="#b" transform="rotate(20) scale(.5)" />
    //       <Use href="#b" transform="rotate(60) scale(.6)" />
    //       <Use href="#b" transform="rotate(10) scale(.7)" />
    //       <Use href="#b" transform="rotate(-40) scale(.835)" />
    //       <Use href="#b" transform="rotate(40) scale(.9)" />
    //       <Use href="#b" transform="rotate(25) scale(1.05)" />
    //       <Use href="#b" transform="rotate(8) scale(1.2)" />
    //       <Use href="#b" transform="rotate(-60) scale(1.333)" />
    //       <Use href="#b" transform="rotate(-30) scale(1.45)" />
    //       <Use href="#b" transform="rotate(10) scale(1.6)" />
    //     </G>
    //   </Defs>
    //   <G transform="translate(0 645)">
    //     <Circle fill="url(#c)" r={3000} />
    //     <G opacity={0.5} fill="url(#c)">
    //       <Circle r={2000} />
    //       <Circle r={1800} />
    //       <Circle r={1700} />
    //       <Circle r={1651} />
    //       <Circle r={1450} />
    //       <Circle r={1250} />
    //       <Circle r={1175} />
    //       <Circle r={900} />
    //       <Circle r={750} />
    //       <Circle r={500} />
    //       <Circle r={380} />
    //       <Circle r={250} />
    //     </G>
    //     <G transform="rotate(-46.8 0 0)">
    //       <Use href="#d" transform="rotate(10)" />
    //       <Use href="#d" transform="rotate(120)" />
    //       <Use href="#d" transform="rotate(240)" />
    //     </G>
    //     <Circle fillOpacity={0.24} fill="url(#c)" r={3000} />
    //   </G>
    // </Svg>
    // <Svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="100%"
    //   height="40%"
    //   preserveAspectRatio="none"
    //   viewBox="0 0 1440 560"
    //   {...props}
    // >
    //   <G mask='url("#SvgjsMask1151")' fill="none">
    //     <Path fill="rgba(79, 70, 229, 1)" d="M0 0H1440V560H0z" />
    //     <Path
    //       d="M0 123c96 25.8 288 137.4 480 129 192-8.4 288-176 480-171s384 156.8 480 196v283H0z"
    //       fill="rgba(125, 119, 233, 1)"
    //     />
    //     <Path
    //       d="M0 536c144-48.6 432-242.8 720-243 288-.2 576 193.6 720 242v25H0z"
    //       fill="rgba(255, 255, 255, 1)"
    //     />
    //   </G>
    //   <Defs>
    //     <Mask id="SvgjsMask1151">
    //       <Path fill="#fff" d="M0 0H1440V560H0z" />
    //     </Mask>
    //   </Defs>
    // </Svg>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height + CONSTANTS.statusBarHeight * 2}
      preserveAspectRatio="none"
      viewBox="0 0 1080 1920"
      {...props}
    >
      <G mask='url("#SvgjsMask1029")' fill="none">
        <Path fill="rgba(43, 102, 86, 1)" d="M0 0H1080V1920H0z" />
        <Path
          d="M0 897.634c166.246 7.19 328.633-88.605 441.137-211.211 102.08-111.245 83.272-281.144 139.303-421.345 52.356-131.006 158.431-234.591 178.641-374.217 24.689-170.573 67.78-379.579-51.533-503.955C587.229-738.518 369.092-640.1 202.429-689.41 35.24-738.875-97.913-952.253-264.463-900.677c-167.214 51.781-162.31 299.714-268.386 438.961-96.595 126.802-297.594 181.317-323.896 338.535-26.271 157.029 117.455 286.465 196.183 424.849 71.383 125.474 136.103 250.925 243.286 347.626C-294.613 759.961-165.053 890.495 0 897.634"
          fill="#25574b"
        />
        <Path
          d="M1080 2383.74c89.521-3.297 172.271-32.113 254.4-67.886 96.406-41.991 217.41-64.902 265.34-158.497 47.984-93.701 3.226-207.255-26.295-308.304-26.267-89.911-86.466-159.793-134.034-240.485-59.79-101.424-70.414-255.501-181.443-294.672-109.798-38.736-217.698 64.521-321.514 117.231-86.07 43.7-159.646 99.498-231.75 163.677-82.833 73.729-184.991 134.607-221.145 239.441-38.871 112.712-47.691 250.397 17.87 349.98 64.805 98.435 200.422 112.403 311.836 150.823 87.209 30.073 174.549 52.087 266.735 48.692"
          fill="#408974"
        />
      </G>
      <Defs>
        <Mask id="SvgjsMask1029">
          <Path fill="#fff" d="M0 0H1080V1920H0z" />
        </Mask>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
