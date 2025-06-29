import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { SwiperProps } from '../types';
import { responsive } from '../utils';

export interface SwiperRef {
  to: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Swiper = forwardRef<SwiperRef, SwiperProps>((
  {
    width = screenWidth,
    height = 200,
    autoPlay = 0,
    duration = 500,
    initPage = 0,
    direction = 'horizontal',
    loop = true,
    showIndicators = true,
    indicatorColor = '#FFFFFF',
    indicatorActiveColor,
    children,
    onChange,
    style,
  },
  ref
) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(initPage);
  const [isScrolling, setIsScrolling] = useState(false);
  const autoPlayTimer = useRef<number | null>(null);
  
  const isHorizontal = direction === 'horizontal';
  const activeIndicatorColor = indicatorActiveColor || theme.colors.primary;
  
  // 处理子元素
  const childrenArray = useMemo(() => {
    return React.Children.toArray(children).filter(React.isValidElement);
  }, [children]);
  
  const totalCount = childrenArray.length;
  
  // 如果启用循环，需要在首尾添加额外的元素
  const displayChildren = useMemo(() => {
    if (!loop || totalCount <= 1) return childrenArray;
    
    return [
      childrenArray[totalCount - 1], // 在开头添加最后一个元素
      ...childrenArray,
      childrenArray[0], // 在结尾添加第一个元素
    ];
  }, [childrenArray, loop, totalCount]);
  
  const displayCount = displayChildren.length;
  
  // 计算样式
  const styles = useMemo(() => {
    const containerStyle: ViewStyle = {
      width: isHorizontal ? width : '100%',
      height: isHorizontal ? height : height,
      position: 'relative',
    };
    
    const scrollViewStyle: ViewStyle = {
      width: '100%',
      height: '100%',
    };
    
    const contentContainerStyle: ViewStyle = isHorizontal
      ? {
          flexDirection: 'row',
          width: width * displayCount,
        }
      : {
          height: height * displayCount,
        };
    
    const itemStyle: ViewStyle = {
      width: isHorizontal ? width : '100%',
      height: isHorizontal ? height : height,
    };
    
    const indicatorContainerStyle: ViewStyle = {
      position: 'absolute',
      bottom: responsive(12),
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: responsive(6),
    };
    
    const indicatorStyle: ViewStyle = {
      width: responsive(8),
      height: responsive(8),
      borderRadius: responsive(4),
      backgroundColor: indicatorColor,
      opacity: 0.5,
    };
    
    const activeIndicatorStyle: ViewStyle = {
      ...indicatorStyle,
      backgroundColor: activeIndicatorColor,
      opacity: 1,
    };
    
    return {
      containerStyle,
      scrollViewStyle,
      contentContainerStyle,
      itemStyle,
      indicatorContainerStyle,
      indicatorStyle,
      activeIndicatorStyle,
    };
  }, [width, height, isHorizontal, displayCount, indicatorColor, activeIndicatorColor, theme]);
  
  // 滚动到指定索引
  const scrollToIndex = useCallback((index: number, animated = true) => {
    if (!scrollViewRef.current) return;
    
    const targetIndex = loop ? index + 1 : index;
    const offset = isHorizontal ? targetIndex * width : targetIndex * height;
    
    if (isHorizontal) {
      scrollViewRef.current.scrollTo({ x: offset, y: 0, animated });
    } else {
      scrollViewRef.current.scrollTo({ x: 0, y: offset, animated });
    }
  }, [loop, isHorizontal, width, height]);
  
  // 处理滚动事件
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling) return;
    
    const offset = isHorizontal ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
    const size = isHorizontal ? width : height;
    let index = Math.round(offset / size);
    
    if (loop) {
      if (index === 0) {
        // 滚动到了第一个元素（实际是最后一个元素的副本）
        index = totalCount - 1;
        setCurrentIndex(index);
        setTimeout(() => {
          scrollToIndex(index, false);
        }, 50);
        return;
      } else if (index === displayCount - 1) {
        // 滚动到了最后一个元素（实际是第一个元素的副本）
        index = 0;
        setCurrentIndex(index);
        setTimeout(() => {
          scrollToIndex(index, false);
        }, 50);
        return;
      } else {
        index = index - 1;
      }
    }
    
    if (index !== currentIndex && index >= 0 && index < totalCount) {
      setCurrentIndex(index);
      onChange?.(index);
    }
  }, [isScrolling, isHorizontal, width, height, loop, totalCount, displayCount, currentIndex, onChange, scrollToIndex]);
  
  // 开始自动播放
  const startAutoPlay = useCallback(() => {
    if (autoPlay <= 0 || totalCount <= 1) return;
    
    autoPlayTimer.current = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % totalCount;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, autoPlay) as unknown as number;
  }, [autoPlay, totalCount, scrollToIndex]);
  
  // 停止自动播放
  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  }, []);
  
  // 暴露方法
  useImperativeHandle(ref, () => ({
    to: (index: number) => {
      if (index >= 0 && index < totalCount) {
        setCurrentIndex(index);
        scrollToIndex(index);
      }
    },
    next: () => {
      const nextIndex = (currentIndex + 1) % totalCount;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    },
    prev: () => {
      const prevIndex = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToIndex(prevIndex);
    },
  }));
  
  // 初始化
  useEffect(() => {
    if (initPage > 0 && initPage < totalCount) {
      setTimeout(() => {
        scrollToIndex(initPage, false);
      }, 100);
    }
  }, []);
  
  // 自动播放控制
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);
  
  // 处理滚动开始和结束
  const handleScrollBeginDrag = useCallback(() => {
    setIsScrolling(true);
    stopAutoPlay();
  }, [stopAutoPlay]);
  
  const handleScrollEndDrag = useCallback(() => {
    setIsScrolling(false);
    startAutoPlay();
  }, [startAutoPlay]);
  
  if (totalCount === 0) {
    return <View style={[styles.containerStyle, style]} />;
  }
  
  return (
    <View style={[styles.containerStyle, style]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal={isHorizontal}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {displayChildren.map((child, index) => (
          <View key={index} style={styles.itemStyle}>
            {child}
          </View>
        ))}
      </ScrollView>
      
      {showIndicators && totalCount > 1 && (
        <View style={styles.indicatorContainerStyle}>
          {childrenArray.map((_, index) => (
            <View
              key={index}
              style={index === currentIndex ? styles.activeIndicatorStyle : styles.indicatorStyle}
            />
          ))}
        </View>
      )}
    </View>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;