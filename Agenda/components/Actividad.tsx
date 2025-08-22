import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActividadProps {
  id: number;
  descripcion: string;
  completada: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Actividad: React.FC<ActividadProps> = ({ 
  id, 
  descripcion, 
  completada, 
  onToggle, 
  onDelete 
}) => {
  return (
    <View style={[
      styles.container,
      completada && styles.completedContainer
    ]}>
      {/* Icono de estado */}
      <View style={styles.statusIcon}>
        <Text style={styles.statusText}>
          {completada ? '✅' : '⏳'}
        </Text>
      </View>

      {/* Descripción de la actividad */}
      <View style={styles.textContainer}>
        <Text style={[
          styles.text,
          completada && styles.completedText
        ]}>
          {descripcion}
        </Text>
        <Text style={styles.statusLabel}>
          {completada ? 'Completada' : 'Pendiente'}
        </Text>
      </View>
      
      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            completada ? styles.undoButton : styles.completeButton
          ]} 
          onPress={() => onToggle(id)}
        >
          <Text style={styles.buttonText}>
            {completada ? '↩️' : '✓'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => onDelete(id)}
        >
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedContainer: {
    backgroundColor: '#f8f9fa',
    borderLeftColor: '#28a745',
  },
  statusIcon: {
    marginRight: 15,
  },
  statusText: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  completeButton: {
    backgroundColor: '#28a745',
  },
  undoButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Actividad;