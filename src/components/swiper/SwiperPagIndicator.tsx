import React from 'react'
import { View, StyleSheet } from 'react-native'

export interface SwiperPagIndicatorProps {
    total: number
    current: number
    vertical?: boolean
    style?: any
    activeColor?: string
    inactiveColor?: string
}

const SwiperPagIndicator = React.memo<SwiperPagIndicatorProps>(
    ({ total, current, vertical = false, style, activeColor = '#fff', inactiveColor = 'rgba(255, 255, 255, 0.5)' }) => {
        const dots: React.ReactElement[] = []

        for (let i = 0; i < total; i++) {
            dots.push(
                <View
                    key={i}
                    style={[
                        styles.dot,
                        {
                            backgroundColor: current === i ? activeColor : inactiveColor,
                            width: current === i ? 8 : 6,
                            height: current === i ? 8 : 6,
                            borderRadius: current === i ? 4 : 3,
                        },
                    ]}
                />
            )
        }

        return (
            <View
                style={[
                    styles.container,
                    vertical ? styles.containerVertical : styles.containerHorizontal,
                    style,
                ]}
            >
                {dots}
            </View>
        )
    }
)

SwiperPagIndicator.displayName = 'SwiperPagIndicator'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHorizontal: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    },
    containerVertical: {
        position: 'absolute',
        right: 16,
        top: 0,
        bottom: 0,
        flexDirection: 'column',
    },
    dot: {
        marginHorizontal: 4,
        marginVertical: 4,
    },
})

export default SwiperPagIndicator

