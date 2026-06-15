/**
 * react-navigation v7 adapter (native). Renders the OmniRoute table as a
 * stack navigator by default. For bottom tabs, pass `mode="tabs"`.
 *
 *   <NavigationContainer>
 *     <OmniNavigator routes={routes} mode="tabs" />
 *   </NavigationContainer>
 *
 * react-navigation isn't a hard dep so we require it lazily; consumers who
 * don't install it get a clear error rather than a cryptic missing-module
 * stack at runtime.
 */
import { createElement } from "react";
import type { OmniRoute } from "../defineRoutes";

export interface OmniNavigatorProps {
  routes: OmniRoute[];
  mode?: "stack" | "tabs";
}

type NativeStackModule = {
  createNativeStackNavigator: () => {
    Navigator: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
    Screen: React.ComponentType<Record<string, unknown>>;
  };
};

type BottomTabsModule = {
  createBottomTabNavigator: () => {
    Navigator: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
    Screen: React.ComponentType<Record<string, unknown>>;
  };
};

function requireMissing(name: string): never {
  throw new Error(
    `[@plyxui/navigator] ${name} isn't installed. Run "npm install ${name} @react-navigation/native" and follow the @react-navigation install instructions.`,
  );
}

export function OmniNavigator({ routes, mode = "stack" }: OmniNavigatorProps) {
  let Navigator: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
  let Screen: React.ComponentType<Record<string, unknown>>;

  if (mode === "tabs") {
    let mod: BottomTabsModule;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      mod = require("@react-navigation/bottom-tabs") as BottomTabsModule;
    } catch {
      return requireMissing("@react-navigation/bottom-tabs");
    }
    const nav = mod.createBottomTabNavigator();
    Navigator = nav.Navigator;
    Screen = nav.Screen;
  } else {
    let mod: NativeStackModule;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      mod = require("@react-navigation/native-stack") as NativeStackModule;
    } catch {
      return requireMissing("@react-navigation/native-stack");
    }
    const nav = mod.createNativeStackNavigator();
    Navigator = nav.Navigator;
    Screen = nav.Screen;
  }

  return createElement(
    Navigator,
    null,
    ...routes
      .filter((r) => !r.hidden)
      .map((r) =>
        createElement(Screen, {
          key: r.name,
          name: r.name,
          component: r.element,
          options: { title: r.title },
        }),
      ),
  );
}
