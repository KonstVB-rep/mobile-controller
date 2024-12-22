import ScanDrawer from "@/components/camera/ScanDrawer/ScanDrawer";
import { SheetDefinition, registerSheet } from "react-native-actions-sheet";

// Register your Sheet component.
/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet("qrScanDrawer", ScanDrawer);

/**
 * We extend some of the types here to give us great intellisense
 * across the app for all registered sheets.
 */
declare module "react-native-actions-sheet" {
  export interface Sheets {
    /**
     * A simple sheet example
     */

    gestures: SheetDefinition;
  }
}

export {};

/**
 * Since we are not importing our Sheets in any component or file, we want to make sure
 * they are bundled by the JS bundler. Hence we will import this file in App.js.
 */