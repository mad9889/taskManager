import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const AICheck = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('Explain debouncing in simple terms');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gpt-3.5-turbo');

  const testAPI = async () => {
    if (!apiKey) {
      Alert.alert('Error', 'Please enter your OpenAI API key');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(result.data.choices[0]?.message?.content || 'No response');
    } catch (error: any) {
      setResponse(`Error: ${error.response?.data?.error?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>OpenAI API Tester</Text>

      <Text style={styles.label}>API Key:</Text>
      <TextInput
        style={styles.input}
        placeholder="sk-..."
        value={apiKey}
        onChangeText={setApiKey}
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.label}>Model:</Text>
      <View style={styles.modelContainer}>
        <TouchableOpacity
          style={[styles.modelButton, model === 'gpt-3.5-turbo' && styles.activeModel]}
          onPress={() => setModel('gpt-3.5-turbo')}
        >
          <Text>GPT-3.5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modelButton, model === 'gpt-4' && styles.activeModel]}
          onPress={() => setModel('gpt-4')}
        >
          <Text>GPT-4</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Prompt:</Text>
      <TextInput
        style={[styles.input, styles.promptInput]}
        multiline
        numberOfLines={4}
        value={prompt}
        onChangeText={setPrompt}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={testAPI}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Test API Key</Text>
        )}
      </TouchableOpacity>

      {response ? (
        <>
          <Text style={styles.label}>Response:</Text>
          <View style={styles.responseBox}>
            <Text selectable style={styles.responseText}>
              {response}
            </Text>
          </View>
        </>
      ) : null}

      <Text style={styles.note}>
        Note: Your API key is used only for this request and is not stored.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10a37f',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  promptInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#10a37f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  responseBox: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#10a37f',
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
  },
  responseText: {
    fontSize: 15,
    lineHeight: 22,
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  modelContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  modelButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeModel: {
    backgroundColor: '#10a37f',
    borderColor: '#0e8a6a',
  },
});

export default AICheck;