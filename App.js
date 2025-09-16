import React, { useState, useEffect } from 'react'; // React + hooks básicos para estado e ciclo de vida
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Telas
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RobotListScreen from './src/screens/RobotListScreen';
import RobotDetailScreen from './src/screens/RobotDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal por abas (Tab Navigator) que agrupa as seções centrais da aplicação.
// Esta estrutura foi adicionada/agregada no alinhamento para facilitar futura expansão (ex: adicionar Sensores, Entregas, etc.)
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Robôs') {
            iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Robôs" component={RobotStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stack específico para robôs: permite navegar da lista para detalhes mantendo a tab "Robôs" selecionada.
// Separar em um stack facilita adicionar novas telas (ex: criação/edição) sem poluir o Tab principal.
const RobotStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de Robôs" component={RobotListScreen} />
      <Stack.Screen name="Detalhes do Robô" component={RobotDetailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Bootstrap de autenticação: tenta recuperar token persistido para pular tela de login se já autenticado.
    // Caso futuro: aqui poderemos validar expiração do token real vindo do backend.
    const bootstrapAsync = async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('Falha ao recuperar token', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (data) => {
      // Futuro: substituir mock pelo fluxo real (chamada ao backend, retorno de JWT, claims etc.)
      const token = 'dummy-auth-token';
      try {
        await AsyncStorage.setItem('userToken', token);
      } catch (e) {
        console.log('Erro ao salvar token', e);
      }
      setUserToken(token);
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log('Erro ao remover token', e);
      }
      setUserToken(null);
    },
  }), []);

  if (isLoading) {
    return null; // Poderia ser substituído por Splash/Loader para melhor UX
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen 
              name="Main" 
              component={MainTabNavigator} 
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// Contexto de autenticação exposto aqui para simplificar neste alinhamento.
// Em refatorações futuras, mover para src/context/AuthContext.js e centralizar lógicas (refresh, roles, etc.).
export const AuthContext = React.createContext();
