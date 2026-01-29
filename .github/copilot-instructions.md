# MindEase AI Coding Instructions

## Project Overview
MindEase is a React Native/Expo task management mobile application with user authentication, task tracking, and routine management. It uses Supabase for backend, Redux Toolkit for state management, and React Navigation for screen navigation.

## Architecture

### Technology Stack
- **Mobile Framework**: React Native 0.81.5 with Expo (~54.0.32)
- **Navigation**: React Navigation (native-stack)
- **State Management**: Redux Toolkit + React-Redux
- **Backend**: Supabase (authentication, database, real-time updates)
- **Date Handling**: dayjs
- **TypeScript**: Strict mode enabled (tsconfig.json)

### Directory Structure
- `src/screens/` - App screens (Splash, Login, Signup, Dashboard, AddTask, TaskDetail, Routines)
- `src/navigation/` - Navigation configuration (AppNavigator.tsx - central entry point)
- `src/context/` - React Context providers (AuthContext.tsx - typically for auth state)
- `src/hooks/` - Custom React hooks (userTasks.ts - task-related hooks)
- `src/api/` - Supabase client setup and API calls (currently empty)
- `src/types/` - TypeScript interfaces and types
- `src/constants/` - Static values (colors.ts - design tokens)
- `src/utils/` - Helper functions (dateHelpers.ts - date utilities)

### Navigation Stack
The app follows a standard auth flow pattern:
1. **Splash Screen** (2-second loading) → Login/Signup
2. **Authentication Screens** (Login, Signup)
3. **Dashboard Screen** (authenticated main screen)
4. **Feature Screens** (AddTask, TaskDetail, Routines)

Navigation defined in `src/navigation/AppNavigator.tsx` with headers hidden globally.

## Key Development Patterns

### Styling Conventions
- **Color Scheme**: Primary accent color is `#4B7BEC` (blue), backgrounds are white `#fff`
- **Method**: React Native `StyleSheet.create()` - define styles inline per screen
- **Layout**: Use flexbox; container typically has `{ flex: 1, padding: 20, backgroundColor: '#fff' }`

### Screen Component Template
```tsx
const ScreenName = ({ navigation }: any) => {
  // State management here
  return (
    <View style={styles.container}>
      {/* Content */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Component styles
});
```

### State Management Strategy
- **Redux** for global state (tasks, user data, routines)
- **Local State** with `useState()` for form inputs (see AddTaskScreen.tsx)
- **AuthContext** for authentication state (file exists but empty - implement here for auth across app)

## Integration Points

### Supabase Setup
- Dependency installed (`@supabase/supabase-js` v2.93.2)
- **Expected location**: `src/api/` should contain Supabase client initialization
- **Pattern**: Create client instance, export functions for auth (login, signup) and data operations
- **Features needed**: User authentication, task CRUD, routine management

### Redux Slices to Create
- `userSlice` - user profile, auth status
- `tasksSlice` - tasks list, add/edit/delete operations
- `routinesSlice` - recurring task templates

## Build & Development

### Scripts (package.json)
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version

### TypeScript Configuration
- Strict mode enabled - all code must be properly typed
- Target Expo types: use existing types from React Native and Expo packages
- Define custom types in `src/types/index.ts`

## Common Tasks

### Adding a New Screen
1. Create component in `src/screens/`
2. Import in `src/navigation/AppNavigator.tsx` and add `<Stack.Screen>`
3. Add navigation params to type system if needed

### Adding Colors/Constants
- Define in `src/constants/colors.ts` and reuse throughout (don't hardcode `#4B7BEC`)
- Pattern: `export const PRIMARY_COLOR = '#4B7BEC';`

### Adding Date Utilities
- Use dayjs (already imported in utils)
- Centralize date formatting in `src/utils/dateHelpers.ts` for consistency

### Form State in Screens
- Use `useState()` for local form inputs (see AddTaskScreen.tsx example)
- Connect to Redux/Supabase only on save/submit actions

## Important Notes
- **No Navigation Headers**: Global `headerShown: false` in AppNavigator - manage UI navigation purely within screens
- **New Architecture Enabled**: Expo app.json has `"newArchEnabled": true` - use latest React Native patterns
- **Strict TypeScript**: Avoid `any` types; import types from React Native and define custom types in src/types/index.ts
- **Gesture Handling**: react-native-gesture-handler installed for navigation support (no direct app usage yet)
