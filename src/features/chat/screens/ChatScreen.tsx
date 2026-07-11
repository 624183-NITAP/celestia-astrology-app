import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { CosmicBackground, GlassCard } from '../../../shared/components';
import { Colors, TextStyles, Spacing } from '../../../shared/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Greetings, voyager. I am your celestial guide. Ask me anything about your natal configuration or transits.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const responseText = "Based on your chart, the present alignment shows a strong transit activation. You are encouraged to maintain stability while seeking internal development.";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai' }]);
    }, 1200);
  };

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[TextStyles.h1, styles.headerTitle]}>AI Astrologer</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  item.sender === 'user' ? styles.userRow : styles.aiRow
                ]}
              >
                <GlassCard
                  style={[
                    styles.bubble,
                    item.sender === 'user' ? styles.userBubble : styles.aiBubble
                  ]}
                  variant={item.sender === 'user' ? 'accent' : 'default'}
                  padding={Spacing.md}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </GlassCard>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <GlassCard style={styles.inputCard} padding={0}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Ask about your destiny..."
                  placeholderTextColor={Colors.text.muted}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                  <Text style={styles.sendIcon}>✨</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: Colors.text.primary,
    fontWeight: '700',
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    width: '100%',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: Colors.text.primary,
    fontSize: 15,
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: 'transparent',
  },
  inputCard: {
    borderRadius: 25,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 50,
  },
  textInput: {
    flex: 1,
    color: Colors.text.primary,
    fontSize: 15,
    height: '100%',
  },
  sendBtn: {
    paddingHorizontal: Spacing.sm,
  },
  sendIcon: {
    fontSize: 20,
  },
});
