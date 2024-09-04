import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PanResponder, GestureResponderEvent, TouchableOpacity } from 'react-native';
import colors from '../components/ColorTemplate';
import MotivationalMessages from '../components/MotivationalMessage';
import { Canvas, Path, Skia, SkPath } from '@shopify/react-native-skia';


const CanvaScreen = () => {
  const [canvasPaths, setCanvasPaths] = useState<{ path: SkPath; color: string; strokeWidth: number }[]>([]);
  const [currentCanvasPath, setCurrentCanvasPath] = useState<SkPath | null>(null);
  const [canvasEraser, setCanvasEraser] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(colors.textPrimary); // Default stroke color

  const strokeWidth = canvasEraser ? 30 : 5; // Eraser : Stroke

  const canvasPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt: GestureResponderEvent) => {
      const { locationX, locationY } = evt.nativeEvent;
      const newCanvasPath = Skia.Path.Make();
      newCanvasPath.moveTo(locationX, locationY);
      setCurrentCanvasPath(newCanvasPath);
    },
    onPanResponderMove: (evt: GestureResponderEvent) => {
      const { locationX, locationY } = evt.nativeEvent;
      if (currentCanvasPath) {
        currentCanvasPath.lineTo(locationX, locationY);
        setCurrentCanvasPath(Skia.Path.MakeFromSVGString(currentCanvasPath.toSVGString())!);
      }
    },
    onPanResponderRelease: () => {
      if (currentCanvasPath) {
        const color = canvasEraser ? colors.white : selectedColor;
        const canvasColorPath = currentCanvasPath;
        setCanvasPaths([...canvasPaths, { path: canvasColorPath, color, strokeWidth }]); 
        setCurrentCanvasPath(null);
      }
    },
  });

  const undoLastStroke = () => {
    setCanvasPaths(canvasPaths.slice(0, -1)); 
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const clearCanvas = () => {
    setCanvasPaths([]); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.motivationalContainer}>
          <MotivationalMessages />
        </View>
        <View style={styles.imileyContainer}>
          <Image source={require('../assets/imiley_loading.png')} style={styles.imileyIcon} />
        </View>
      </View>
            
      <View style={styles.canvasContainer}>
        <View style={styles.canvasControlPanel}>
          <TouchableOpacity onPress={() => setCanvasEraser(false)} style={[styles.controlButton, !canvasEraser && styles.controlButton]}>
            <Text style={styles.controlButtonText}>Draw</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCanvasEraser(true)} style={[styles.controlButton, canvasEraser && styles.controlButton]}>
            <Text style={styles.controlButtonText}>Erase</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={undoLastStroke} style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearCanvas} style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <Canvas style={styles.canvasDrawingArea} {...canvasPanResponder.panHandlers}>
          {canvasPaths.map((item, index) => (
            <Path key={index} path={item.path} color={item.color} strokeWidth={item.strokeWidth} style="stroke" />
          ))}
          {currentCanvasPath && <Path path={currentCanvasPath} color={canvasEraser ? 'white' : selectedColor} strokeWidth={strokeWidth} style="stroke" />}
        </Canvas>

        <View style={styles.canvasControlPanel}>
          <View style={styles.canvasColorPalette}>
            {[colors.textPrimary, colors.pinkMood, colors.orangeMood, colors.yellowMood, colors.greenMood, colors.blueMood, colors.purpleMood].map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.canvasColorButton, { backgroundColor: color }]}
                onPress={() => handleColorChange(color)}
              />
            ))}
          </View>
        </View>


      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row', 
    bottom: 5,
  },
  motivationalContainer:{
    width: 263,
    height: 60,
    backgroundColor: colors.ascent,
    marginRight: 15,
    borderRadius: 20,
  },
  imileyContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.ascent,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imileyIcon: {
    width: 34,
    height: 11
  },
  canvasContainer: {
    width: 338,
    height: 580,
    backgroundColor: colors.white,
    borderRadius: 10,
    top: 15,
    padding: 20,
  },
  canvasDrawingArea: {
    bottom: -10,
    flex: 1,
    backgroundColor: colors.white
  },
  canvasControlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  
  },
  controlButton: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.ascent,
    marginHorizontal: 5,
  },
  controlButtonText: {
    color: colors.textPrimary,
  },
  canvasColorPalette: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    width: 320,
  },
  canvasColorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },

});

export default CanvaScreen;