import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Manage from './screens/Manage';
import Recent from './screens/Recent';
import All from './screens/All';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/ui/Icon';
import ExpenseContextProvider from './store/ExpenseContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const OverView = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Group
          screenOptions={({ navigation }) => ({
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2600FF' },
            headerTintColor: 'white',
            tabBarStyle: {
              backgroundColor: '#2600FF',
              height: 60,
              paddingBottom: 10,
            },
            tabBarActiveTintColor: '#EEFF00',
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate('ManageExpense');
                }}
              />
            ),
          })}
        >
          <Tab.Screen
            name="RecentExpense"
            component={Recent}
            options={{
              title: 'Recent Expense',
              tabBarLabel: 'Recent',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="hourglass" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="AllExpense"
            component={All}
            options={{
              title: 'All Expense',
              tabBarLabel: 'All',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" size={size} color={color} />
              ),
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="OverView">
            <Stack.Group
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#2600FF',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
              }}
            >
              <Stack.Screen
                name="ManageExpense"
                component={Manage}
                options={{ presentation: 'modal' }}
              />
              <Stack.Screen
                name="OverView"
                component={OverView}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
