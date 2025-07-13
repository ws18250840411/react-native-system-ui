import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { ThemeProvider } from './components/theme';
import { Button } from './components/Button';

const ButtonExample = () => {
  const handlePress = (type: string) => {
    Alert.alert('Button Pressed', `${type} button was pressed!`);
  };

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Button Component Examples</Text>
        
        {/* 基础按钮 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Buttons</Text>
          <View style={styles.row}>
            <Button 
              title="Primary" 
              onPress={() => handlePress('Primary')}
              style={styles.button}
            />
            <Button 
              title="Secondary" 
              color="secondary"
              onPress={() => handlePress('Secondary')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 变体样式 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Variants</Text>
          <View style={styles.row}>
            <Button 
              title="Filled" 
              variant="filled"
              onPress={() => handlePress('Filled')}
              style={styles.button}
            />
            <Button 
              title="Outlined" 
              variant="outlined"
              onPress={() => handlePress('Outlined')}
              style={styles.button}
            />
          </View>
          <View style={styles.row}>
            <Button 
              title="Text" 
              variant="text"
              onPress={() => handlePress('Text')}
              style={styles.button}
            />
            <Button 
              title="Ghost" 
              variant="ghost"
              onPress={() => handlePress('Ghost')}
              style={styles.button}
            />
          </View>
        </View>

        {/* Plain 模式 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plain Mode</Text>
          <View style={styles.row}>
            <Button 
              title="Plain Filled" 
              variant="filled"
              plain
              onPress={() => handlePress('Plain Filled')}
              style={styles.button}
            />
            <Button 
              title="Plain Outlined" 
              variant="outlined"
              plain
              color="success"
              onPress={() => handlePress('Plain Outlined')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 自定义颜色 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Colors</Text>
          <View style={styles.row}>
            <Button 
              title="Custom Color" 
              color="#9C27B0"
              onPress={() => handlePress('Custom Color')}
              style={styles.button}
            />
            <Button 
              title="Plain Custom" 
              variant="outlined"
              plain
              color="#FF5722"
              onPress={() => handlePress('Plain Custom')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 尺寸 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Sizes</Text>
          <View style={styles.column}>
            <Button 
              title="Small Button" 
              size="small"
              onPress={() => handlePress('Small')}
              style={styles.buttonMargin}
            />
            <Button 
              title="Medium Button" 
              size="medium"
              onPress={() => handlePress('Medium')}
              style={styles.buttonMargin}
            />
            <Button 
              title="Large Button" 
              size="large"
              onPress={() => handlePress('Large')}
              style={styles.buttonMargin}
            />
          </View>
        </View>

        {/* 状态 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button States</Text>
          <View style={styles.row}>
            <Button 
              title="Loading" 
              loading
              onPress={() => handlePress('Loading')}
              style={styles.button}
            />
            <Button 
              title="Disabled" 
              disabled
              onPress={() => handlePress('Disabled')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 图标按钮 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Icon Buttons</Text>
          <View style={styles.row}>
            <Button 
              title="Left Icon" 
              icon="heart"
              iconPosition="left"
              onPress={() => handlePress('Left Icon')}
              style={styles.button}
            />
            <Button 
              title="Right Icon" 
              icon="star"
              iconPosition="right"
              variant="outlined"
              onPress={() => handlePress('Right Icon')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 块级按钮 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Block Button</Text>
          <Button 
            title="Block Button" 
            block
            onPress={() => handlePress('Block')}
            style={styles.buttonMargin}
          />
        </View>

        {/* 形状 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Shapes</Text>
          <View style={styles.row}>
            <Button 
              title="Round" 
              shape="round"
              onPress={() => handlePress('Round')}
              style={styles.button}
            />
            <Button 
              title="Square" 
              shape="square"
              variant="outlined"
              onPress={() => handlePress('Square')}
              style={styles.button}
            />
          </View>
        </View>

        {/* 高级功能 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Features</Text>
          <Button 
            title="With Active Style" 
            activeStyle={{ backgroundColor: '#FF6B6B' }}
            onPress={() => handlePress('Active Style')}
            onPressIn={() => console.log('Press In')}
            onPressOut={() => console.log('Press Out')}
            style={styles.buttonMargin}
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: 4,
  },
  buttonMargin: {
    marginVertical: 4,
  },
});

export default ButtonExample;