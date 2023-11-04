import React from "react";
import Case from "./Case";
import "../styles/App.css";

import song1 from "../static/songs/NEFFEX - Desperate [NCS Release].mp3";
import song2 from "../static/songs/Unknown Brain - Inspiration (feat. Aviella) [NCS Release].mp3";
import song3 from "../static/songs/Unknown Brain - MATAFAKA (feat. Marvin Divine) [NCS Release].mp3";
import song4 from "../static/songs/Unknown Brain - Superhero (feat. Chris Linton) [NCS Release].mp3";

import song1img from "../static/images/song1img.jpg";
import song2img from "../static/images/song2img.jpg";
import song3img from "../static/images/song3img.jpg";
import song4img from "../static/images/song4img.jpg";

import wallpaper1 from "../static/images/wallpaper1.jpg";
import wallpaper2 from "../static/images/wallpaper2.jpg";
import wallpaper3 from "../static/images/wallpaper3.jpg";
import wallpaper4 from "../static/images/wallpaper4.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      menuItems: ["Now Playing", "Music", "Games", "Settings"],
      musicItems: [song1, song2, song3, song4],
      musicImgs: [song1img, song2img, song3img, song4img],
      musicNames: [
        "NEFFEX - Desperate [NCS Release]",
        "Unknown Brain - Inspiration (feat. Aviella) [NCS Release]",
        "Unknown Brain - MATAFAKA (feat. Marvin Divine) [NCS Release].mp3",
        "Unknown Brain - Superhero (feat. Chris Linton) [NCS Release]",
      ],
      wallpaperItems: [wallpaper1, wallpaper2, wallpaper3, wallpaper4],
      songIndex: 0, //current song index
      currentSong: song1, // current playing/played song
      currentSongImg: song1img,
      isPlaying: false, // is currently playing
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, // length of particular menu ?
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, // which menu can be rendered by key menu ?
      currentMenu: -2,
      navigationStack: [],
      theme: "rgb(210,210,210)",
      audio: new Audio(song1),
      wheelColor: "white",
      wallpaper: 0, // index of initial wallpaper to be displayed
      notify: false, // is notification needed
      notificationText: "", //message to be shown when song/wallapaper of anything is changed
    };
  }

  // function for : on long press of forward button tracks are seeked forward
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2 || !this.state.isPlaying) return;
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.musicItems.length - 1) songIndex = 0;
      else songIndex++;
      const currentSong = this.state.musicNames[this.state.songIndex];
      const currentSongImg = this.state.musicImgs[this.state.songIndex];
      this.setState({ ...this.state, songIndex: songIndex, currentSong: currentSong, currentSongImg: currentSongImg }, () => {
        this.state.audio.play();
      });
    } else {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // function for : on long press of backward button tracks are seeked backward
  seekSongBackward = (e) => {
    if (this.state.currentMenu === -2 || !this.state.isPlaying) return;
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) songIndex = this.state.musicItems.length - 1;
      else songIndex--;
      const currentSong = this.state.musicNames[this.state.songIndex];
      const currentSongImg = this.state.musicImgs[this.state.songIndex];
      this.setState({ ...this.state, songIndex: songIndex, currentSong: currentSong, currentSongImg: currentSongImg }, () => {
        this.state.audio.play();
      });
    } else {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // function for: toggle song play and pause
  togglePlayPause = (e) => {
    if (this.state.currentMenu === -2) return;
    if (this.state.isPlaying) {
      this.setState({ ...this.state, isPlaying: false });
      this.state.audio.pause();
    }
    if (!this.state.isPlaying) {
      this.setState({ ...this.state, isPlaying: true });
      this.state.audio.play();
    }
  };

  // function for:  update active menu while rotating on the track wheel
  updateActiveMenu = (direction, menu) => {
    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 9 && menu !== 10) return;
    let min = 0;
    let max = 0;
    max = this.state.lengthMenuKey[menu];
    if (direction === 1) {
      if (this.state.active >= max) this.setState({ ...this.state, active: min });
      else this.setState({ ...this.state, active: this.state.active + 1 });
    } else {
      if (this.state.active <= min) this.setState({ ...this.state, active: max });
      else this.setState({ ...this.state, active: this.state.active - 1 });
    }
  };

  // function for: change the theme of ipod body
  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f0f0";
    } else if (id === 1) {
      theme = "#555d50";
    } else if (id === 2) {
      theme = "#D1CDDA";
    } else if (id === 3) {
      theme = "#c4aeee";
    }
    this.setState({ ...this.state, theme: theme, notify: true, notificationText: `Theme Changed` });
    return;
  };

  setWallpaper = (id) => {
    this.setState({ ...this.state, wallpaper: id, notify: true, notificationText: `Wallpaper Changed` });
  };

  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    } else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3d5afe";
    }
    this.setState({ ...this.state, wheelColor: wheelColor, notify: true, notificationText: `Wheel Color Changed` });
    return;
  };

  // function for: going to previous menu state
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) return;
    else {
      const prevId = navigationStack.pop();
      this.setState({ ...this.state, currentMenu: prevId });
    }
  };

  // function for: going to forward menu state
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();
    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 0 &&
      fromMenu !== 1 &&
      fromMenu !== 3 &&
      fromMenu !== 4 &&
      fromMenu !== 7 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 10
    )
      return;
    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ ...this.state, currentMenu: id, navigationStack: navigationStack, active: 0 });
      return;
    }
    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ ...this.state, currentMenu: -1, navigationStack: navigationStack, active: 0 });
      return;
    }
    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }
    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }
    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }
    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }
    navigationStack.push(this.state.currentMenu);
    if(fromMenu === 4) {
      this.changePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }
    const currentMenuId = this.state.menuMapping[id];
    this.setState({...this.state, currentMenu: currentMenuId, navigationStack: navigationStack, active: 0});
  };

  changePlayingSongFromMusicMenu = (id, navigationStack) => {
    const currentSong = this.state.musicItems[id];
    const currentSongImg = this.state.musicImgs[id];
    this.state.audio.pause();
    this.setState(
      {
        ...this.state,
        currentMenu: 7,
        currentSong: currentSong,
        currentSongImg: currentSongImg,
        navigationStack: navigationStack,
        active: 0,
        isPlaying: true,
        songIndex: id,
        audio: new Audio(currentSong),
      },
      () => {
        this.state.audio.play();
      }
    );
    return;
  };

  setNotification = () => {
    this.setState({...this.state, notify: false, notificationText: ""})
  }

  render() {
    return (
      <div className='App'>
        <Case/>
      </div>
    );
  }
}

export default App;
