# TGlobal Assignment App

A React Native + Expo Router app for managing patients, schedules, and records. It uses a small themed UI layer, local SVG icons, and file‑based navigation.

---

## Quick Start

```bash
npm install
npx expo start
```

* Tabs: Home, Patients, Schedule, Records, Profile
* Routing: `expo-router` with `app/_layout.tsx` and `(tabs)` group
* TypeScript path alias: `@/*` mapped to project root (`tsconfig.json`)

---

## Tech Stack

* React Native 0.81, Expo SDK 54, Expo Router 6
* Theming via `Colors` and `useColorScheme`
* Icons: local SVGs in `assets/svgs` (tinted with `expo-image` or `IconSymbol` fallback)
* State management: `useState` + `useMemo` (simple app-level)
* Animations: `react-native-reanimated`, `LayoutAnimation` where needed
* Form handling: custom components + `TextField`/`SearchInput`
* File-based navigation with `(tabs)` and `(auth)` groups

---

## Architecture

* **File-based routing**: `expo-router` defines screens via folder structure
* **Theming**: `Colors` + `useColorScheme` + themed components (`Text`, `View`, `Button`, `ScrollingTabs`)
* **Components**: Modular, reusable, theme-aware

  * `PatientsCard` → patient row
  * `PatientExtraInfo` → bottom sheet / detailed info
  * `ConsultationNotes` → modal note display
  * `ScrollingTabs` → top tabs with underline
  * `MainHeader` → theme-aware header with optional icons
* **Utilities**: `common/utils.ts` and `common/helper.ts` for formatting, unique IDs, safe getters, and debounce functions
* **Hooks**: `use-color-scheme.ts`, `use-theme-color.ts` for dynamic theming
* **SVGs**: Prefer `expo-image` with `require()` + `tintColor`; fallback to `IconSymbol`

**Folder structure**:

```
app/
  _layout.tsx                # Root stack + tabs
  (tabs)/                    # Bottom tabs
    index.tsx                # Home
    patients.tsx             # Patients list & modal notes
    schedule.tsx             # Sample appointments
    records.tsx              # Sample records
    profile.tsx              # Simple user profile
  (auth)/                    # Auth group (mock)
    _layout.tsx              # Auth stack
    login.tsx                # Login screen
    signup.tsx               # Signup screen
components/
  patients/
    PatientsCard.tsx
    ConsultationNotes.tsx
    PatientExtraInfo.tsx
  themed/
    Text.tsx, View.tsx
    MainHeader.tsx, PageView.tsx
    ScrollingTabs.tsx
    Button.tsx
    SearchInput.tsx, TextField.tsx
  ui/
    icon-symbol.tsx
assets/
  svgs/
constants/
  theme.ts
hooks/
  use-color-scheme.ts, use-theme-color.ts
common/
  utils.ts
  helper.ts
```

---

## Common Utilities

### `common/utils.ts`

Reusable utility functions:

```ts
export function formatDate(date: Date | string) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
}

export function formatPrice(amount: number, currency = "₦") {
  return `${currency}${amount.toLocaleString()}`;
}
```

### `common/helper.ts`

Small helper functions:

```ts
export function get(obj: any, path: string, defaultValue?: any) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? defaultValue;
}

export function uniqueId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

---

## Theming

* `Colors.light` / `Colors.dark` define `text`, `background`, `primary`, `secondary`, `danger`, `neutral`, `tabIconDefault`, `tabIconSelected`
* Components automatically pick colors via `useThemeColor`
* All text and view primitives use themed wrappers (`Text`, `View`) for consistency

---

## Navigation & Tabs

* `app/_layout.tsx` sets up Stack and anchors `(tabs)`
* Bottom Tabs: Home, Patients, Schedule, Records, Profile
* Active tab color: `Colors[scheme].tabIconSelected`; inactive: `tabIconDefault`

---

## Key Components

* **PatientsCard**: avatar, name, gender/age, chevron, expandable info
* **PatientExtraInfo**: contact info, last/upcoming appointments, modal notes
* **ConsultationNotes**: notes cards with date + CTA
* **ScrollingTabs**: top tab selector with light/dark support
* **Button**: filled, outline, text, or standard variants, theme-aware
* **MainHeader**: optional left/right icons, safe area support

---

## Screens

* **Home**: welcome with `HelloWave`
* **Patients**: tabs + search + featured card + list + bottom sheet notes
* **Schedule**: sample appointments with status badges
* **Records**: sample records with collapsible details
* **Profile**: simple logged-in profile
* **Auth**: Login → tabs; Signup → back to Login

---

## Styling & Icons

* Rounded cards (12px), buttons (44px height, 24px radius)
* Tabs: teal for active, gray for inactive
* SVG icons: `expo-image` + `tintColor` preferred; fallback: `IconSymbol`

---

## Troubleshooting

* Blank screens from themed `Text` → ensure `RNText` is used, not the themed wrapper inside itself
* SVG bundling errors → use `require()` or `IconSymbol` instead of importing `.svg` as components
* `expo-router` JSX errors → ensure `@babel/preset-react` is installed

---

## Dependencies

```json
"react-native-actions-sheet": "^10.0.0-alpha.10",
"react-native-gesture-handler": "~2.28.0",
"react-native-reanimated": "~4.1.1",
"react-native-safe-area-context": "~5.6.0",
"react-native-screens": "~4.16.0",
"react-native-size-matters": "^0.4.2",
"react-native-svg": "^15.15.0",
"react-native-svg-transformer": "^1.5.2"
```

---

## Scripts


```bash
npm run reset-project    # starter reset (if needed)
npm run lint             # lint
```

## Images
<img width="500" height="1240" alt="IMG_4710" src="https://github.com/user-attachments/assets/58a32b6f-10ab-4911-9ecd-d9531c255527" /> <img width="500" height="1240" alt="IMG_4711" src="https://github.com/user-attachments/assets/68f90270-a7bd-4075-9975-d2565301dbb7" />
<img width="500" height="1240" alt="IMG_4718" src="https://github.com/user-attachments/assets/77216d79-2f38-481f-86cf-0f0a712ac012" /> <img width="500" height="1240" alt="IMG_4719" src="https://github.com/user-attachments/assets/b1005f5a-7475-4eaa-ad72-27cd450e8132" /> <img width="500" height="1240" alt="IMG_4720" src="https://github.com/user-attachments/assets/fa5d53eb-6739-4bdc-b0f7-7136422dfa4e" /> <img width="500" height="1240" alt="IMG_4712" src="https://github.com/user-attachments/assets/4edb3564-8875-4a0b-9c2d-18db677dbff5" />
<img width="500" height="1240" alt="IMG_4716" src="https://github.com/user-attachments/assets/fcf60a60-f09d-4d2c-9f42-6bf0b9977790" /> <img width="500" height="1240" alt="IMG_4715" src="https://github.com/user-attachments/assets/7ed2b402-aa66-4437-9fcc-4172afc52a8e" /> 



