// App.jsx
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

/*
  1. Create the config
*/
export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "transparent",
        borderRadius: 30,
        height: 60,
        boxShadow: "0px 0px 1px 5px rgba(141, 140, 140, 1)",
      }}
      contentContainerStyle={{ padding: 10 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
        color: "black",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        color: "black",
        textAlign: "center",
      }}
      text2NumberOfLines={3}
    />
  ),
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "transparent",
        borderRadius: 30,
        height: 60,
        boxShadow: "0px 0px 1px 5px rgb(15, 194, 83)",
      }}
      contentContainerStyle={{ padding: 10}}
      text1Style={{
        fontSize: 16,
        color: "black",
      }}
      text2Style={{
        fontSize: 14,
        color: "black",
        textAlign: "center",
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "transparent",
        borderRadius: 100,
        boxShadow: "0px 0px 1px 5px rgb(194, 57, 15)",
        height: 60,
      }}
      contentContainerStyle={{ padding: 10 }}
      text1Style={{
        fontSize: 14,
        color: "black",
      }}
      text2Style={{
        fontSize: 14,
        color: "black",
        textAlign: "center",
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
};
