"use strict";
import React, { Component } from 'react';
import { Animated, StyleSheet, PanResponder, View, Text } from 'react-native';

const CIRCLE_SIZE = 80;
const CIRCLE_COLOR = "blue";
const CIRCLE_HIGHLIGHT_COLOR = "red";

export default class PanResponderDemo extends Component {
    circle = null;
    pan = new Animated.ValueXY();
    scale = new Animated.Value(1);
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder : () => true,

        onPanResponderGrant : () => {
            this.pan.setOffset({
                x : this.pan.x._value,
                y : this.pan.y._value
            });
            Animated.spring(
                this.scale,
                { toValue : 1.2, friction : 3 }
            ).start();
            this.highlight();
        },

        onPanResponderMove : Animated.event([
            null,
            { dx : this.pan.x, dy : this.pan.y }
        ]),

        onPanResponderRelease : () => {
            this.pan.flattenOffset();
            this.pan.setValue({ x : 0, y : 0});
            Animated.spring(
                this.scale,
                { toValue : 1, friction : 3 }
            ).start();
            this.unHighlight();
        }
    });

    highlight = () => {
        this.circle && this.circle.setNativeProps({
            style : { backgroundColor : CIRCLE_HIGHLIGHT_COLOR }
        })
    }

    unHighlight = () => {
        this.circle && this.circle.setNativeProps({
            style : { backgroundColor : CIRCLE_COLOR }
        })
    }

    render() {
        return(
            <View style = { styles.container } >
                <Text style = { styles.titleText } >
                    Drag this circle!
                </Text>
                <Animated.View
                    style = {{
                        transform : [
                            { translateX : this.pan.x },
                            { translateY : this.pan.y },
                            { scale : this.scale }
                        ]
                    }}
                    { ...this.panResponder.panHandlers }
                >
                    <View 
                        ref = { circle => {
                            this.circle = circle;
                        }}
                        style = { styles.circle } 
                    />
                </Animated.View>
            </View>
        );
    }
}
   

const styles = StyleSheet.create({
    circle : {
        width : CIRCLE_SIZE,
        height : CIRCLE_SIZE,
        borderRadius : CIRCLE_SIZE / 2,
        backgroundColor : CIRCLE_COLOR,
    },
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    },
    titleText : {
        fontSize : 14,
        lineHeight : 24,
        fontWeight : "bold"
    }
});

