import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { getFeed } from "../utils/Vids";
import { Video } from "expo-av";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

const Feed = () => {
  let vidRef = React.useRef(null);

  const [currentVid, setCurrentVid] = React.useState(0);

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getFeed().then((res) => {
      console.log("RES", res);
      const uuids = res.map((item) => item.uuid);
      setPosts(uuids);
    });
  }, []);

  const viewabilityConfigCallbackPairs = React.useRef(
    ({ changed, viewableItems }) => {
      console.log("CHANGED", changed);
      console.log("VIEWABLE ITEMS", viewableItems);

      if (changed.length > 0) {
        setCurrentVid(changed[0].index);
      }
    }
  );

  const renderVids = ({ item, index }) => {
    
    const onPlayPausePress = () => {
      // pausing.
      if (index === currentVid) {
        setCurrentVid(-1);
      } else {
        setCurrentVid(index);
      }
    };

    return (
      <TouchableHighlight onPress={onPlayPausePress}>
        <Video
          ref={vidRef}
          source={{
            uri: `https://customer-jg3x48cebqepyjii.cloudflarestream.com/${item}/manifest/video.m3u8`,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={index === currentVid}
          isLooping
          style={styles.videos}
        />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderVids}
        style={styles.page}
        keyExtractor={(item) => item}
        pagingEnabled={true}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 95,
        }}
        onViewableItemsChanged={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    width: "100%",
  },
  videos: {
    width: width,
    height: height,
  },
});

export default Feed;
