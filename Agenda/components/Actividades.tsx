import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Alert 
} from 'react-native';
import Actividad from './Actividad';

interface ActividadInterface {
  id: number;
  descripcion: string;
  completada: boolean;
}

const Actividades = () => {
  // Estado para la lista de actividades
  const [actividades, setActividades] = useState<ActividadInterface[]>([
    { id: 1, descripcion: 'Estudiar React Native', completada: false },
    { id: 2, descripcion: 'Hacer ejercicio', completada: true },
    { id: 3, descripcion: 'Leer un libro', completada: false },
    { id: 4, descripcion: 'Ir de compras', completada: false },
    { id: 5, descripcion: 'Llamar a mamá', completada: true },
  ]);

  // Estado para el campo de texto
  const [descripcion, setDescripcion] = useState('');

  // Método para agregar una nueva actividad
  const agregarActividad = () => {
    if (descripcion.trim() !== '') {
      const nuevaActividad: ActividadInterface = {
        id: Date.now(), // Usar timestamp como ID único
        descripcion: descripcion.trim(),
        completada: false,
      };
      setActividades([...actividades, nuevaActividad]);
      setDescripcion('');
    } else {
      Alert.alert('Error', 'Por favor ingresa una descripción válida');
    }
  };

  // Método para cambiar el estado de una actividad (completada/no completada)
  const toggleActividad = (id: number) => {
    setActividades(
      actividades.map(actividad =>
        actividad.id === id 
          ? { ...actividad, completada: !actividad.completada }
          : actividad
      )
    );
  };

  // Método para eliminar una actividad
  const eliminarActividad = (id: number) => {
    Alert.alert(
      'Eliminar Actividad',
      '¿Estás seguro de que deseas eliminar esta actividad?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setActividades(actividades.filter(actividad => actividad.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Mi Agenda</Text>
      
      {/* Campo de entrada para nueva actividad */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Agregar nueva actividad..."
          placeholderTextColor="#999"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline={false}
          returnKeyType="done"
          onSubmitEditing={agregarActividad}
        />
        
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={agregarActividad}
        >
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total: {actividades.length} | 
          Completadas: {actividades.filter(a => a.completada).length} | 
          Pendientes: {actividades.filter(a => !a.completada).length}
        </Text>
      </View>

      {/* Lista de actividades */}
      {actividades.length > 0 ? (
        <FlatList
          data={actividades}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Actividad
              id={item.id}
              descripcion={item.descripcion}
              completada={item.completada}
              onToggle={toggleActividad}
              onDelete={eliminarActividad}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🎉</Text>
          <Text style={styles.emptySubText}>¡No hay actividades!</Text>
          <Text style={styles.emptySubText}>Agrega una nueva actividad arriba</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: '#bdc3c7',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  statsContainer: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  statsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptySubText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default Actividades;