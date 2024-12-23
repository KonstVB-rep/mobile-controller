// import { View, Text } from "react-native";
// import React from "react";
// import ActionSheet, { useSheetPayload } from "react-native-actions-sheet";

// const ScanDrawer = () => {
//   const payload = useSheetPayload("payload");
//   return (
//     <ActionSheet
//       gestureEnabled={true}
//       // indicatorStyle={{
//       //   width: 400,
//       //   height: 40,
//       //   backgroundColor: "red",
//       // }}
//       // containerStyle={{ backgroundColor: "white" }}
//       // openAnimationConfig={{
//       //   speed: 20,
//       //   delay: 0,
//       //   velocity: 12,
//       // }}
//       // closeAnimationConfig={{
//       //   speed: 20,
//       //   delay: 0,
//       //   velocity: 12,
//       // }}
//     >
//       <View
//         style={{
//           paddingHorizontal: 12,
//           height: 700,
//           width: 300,
//           // transform: [{ translateX: "100%" }],
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "white",
//           position: "relative",
//         }}
//       >
//         <Text
//           style={{
//             color: "black",
//             fontSize: 30,
//             textAlign: "center",
//           }}
//         >
//           Hello, swipe me up and down!
//         </Text>
//         <Text
//           style={{
//             color: "black",
//             fontSize: 30,
//             textAlign: "center",
//           }}
//         >
//           {JSON.stringify(payload)}
//         </Text>
//       </View>
//     </ActionSheet>
//   );
// };

// export default ScanDrawer;

import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/styles-system";
import React from "react";
import { Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

interface ScanDrawerProps {
  children: React.ReactNode;
  data?:any
}

const ScanDrawer = React.forwardRef<ActionSheetRef, ScanDrawerProps>(
  ({ children, data }, ref) => {
    return (
      <ActionSheet
        gestureEnabled={true}
        ref={ref}
        containerStyle={{
          backgroundColor: Colors.black200,
          paddingHorizontal: 12,
          height: 500,
        }}
        indicatorStyle={{
          width: 100,
          height:8,
          backgroundColor: Colors.primary,
        }}
        openAnimationConfig={{
          speed: 20,
          delay: 0,
          velocity: 12,
        }}
        closeAnimationConfig={{
          speed: 20,
          delay: 0,
          velocity: 12,
        }}
      >
        <View
          style={{
            paddingHorizontal: 12,
            height: 500,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </ActionSheet>
    );
  }
);

export default ScanDrawer;
