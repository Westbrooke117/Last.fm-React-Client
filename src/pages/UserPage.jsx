import { useEffect, useState } from 'react';
import '../App.css';
import {
    Container,
    Heading,
    Stack,
    WrapItem,
    Avatar,
    Table,
    TableContainer,
    Tbody,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Link,
    Wrap,
    Tooltip,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ScrobbleContainer from '../components/ScrobbleContainer.jsx';
import BarChartElement from '../components/BarChartElement.jsx';
import axios from 'axios';
import UserInfoContainer from '../components/UserInfoContainer.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {useParams, useNavigate} from "react-router-dom";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');


function UserPage() {
    const route = useParams()
    const navigate = useNavigate();

    const apiKey = "82d112e473f59ade0157abe4a47d4eb5"

    let [user, setUser] = useState(route.username)
    let [recentTracks, setRecentTracks] = useState([{}])
    let [userData, setUserData] = useState({})
    let [trendData, setTrendData] = useState({})
    let [friendData, setFriendData] = useState([{}])

    useEffect(() => {
        let endpoints = [
            `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${user}&api_key=${apiKey}&format=json`,
            `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${user}&api_key=${apiKey}&format=json`,
            `https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${user}&api_key=${apiKey}&format=json`
        ]
        let types = ['artist','album','track']

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((responses) => {
                    let trendObject = {
                        artist: [],
                        album: [],
                        track: []
                    };
                    for (let i = 0; i < responses.length; i++){
                        let weeklychart = `weekly${types[i]}chart`
                        let data = responses[i].data[weeklychart][types[i]]
                        for (let j = 0; j < data.length; j++){
                            if (j >= 10){
                                break;
                            } else {
                                trendObject[types[i]].push(
                                    {
                                        name: data[j].name,
                                        playcount: parseInt(data[j].playcount)
                                    }
                                )
                            }
                        }
                    }
                    setTrendData(trendObject)
                    console.log(trendData)
                }
            );
    },[user])

    useEffect(() => {
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${user}&api_key=${apiKey}&format=json`)
            .then((response) => {
                response = response.data.user
                setUserData(response)
            })
    },[user])

    useEffect(() => {
        class TrackScrobble {
            constructor(name, artist, album, image, loved, date){
                this.name = name;
                this.artist = artist;
                this.album = album;
                this.image = image;
                this.loved = parseInt(loved);
                this.date = date;
            }
        }

        axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=10&extended=1`)
            .then((response) => {
                response = response.data.recenttracks.track
                const tracks = response.map((track => {
                    let time;
                    try {
                        time = track['@attr'].nowplaying
                        time = 'Now playing'
                    } catch (err){
                        time = timeAgo.format(parseInt(track.date.uts) * 1000)
                    }

                    return new TrackScrobble(
                        track.name,
                        track.artist.name,
                        track.album['#text'],
                        track.image[1]['#text'],
                        track.loved,
                        time
                    )
                }))
                setRecentTracks(tracks)
            })
    },[user])

    useEffect(() => {
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=${user}&api_key=${apiKey}&format=json`)
            .then((response) => {
                response = response.data.friends.user
                setFriendData(response)
            })
    },[user])

    return (
        <div className="App">
            <Container maxW={'3xl'}>
                {userData.name && (
                    <UserInfoContainer
                        name={userData.name}
                        image={userData.image[1]['#text']}
                        subscriber={parseInt(userData.subscriber)}
                        scrobbles={parseInt(userData.playcount)}
                        artists={parseInt(userData.artist_count)}
                        albums={parseInt(userData.album_count)}
                    />
                )}
                <Heading mt={3} size={'md'}>Recent Tracks</Heading>
                <TableContainer>
                    <Table variant={'simple'} size={'sm'} mt={3}>
                        <Tbody>
                            { recentTracks[1] && (
                                recentTracks.map(track => (
                                    <ScrobbleContainer
                                        name={track.name}
                                        artist={track.artist}
                                        image={track.image}
                                        loved={track.loved}
                                        date={track.date}
                                    />
                                ))
                            )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Stack mt={3} direction={'row'} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                    <Link fontWeight={'semibold'} fontSize={'sm'} color={'blue.600'}>More tracks</Link>
                    <ChevronRightIcon color={'blue.600'}/>
                </Stack>

                <Tabs mt={5} isFitted={true} variant={'enclosed-colored'}>
                    <TabList display={'flex'} justifyContent={'space-around'}>
                        <Tab>Top Artists</Tab>
                        <Tab>Top Albums</Tab>
                        <Tab>Top Tracks</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TableContainer>
                                <Table variant={'simple'} size={'sm'}>
                                    {
                                        trendData.artist && (
                                            trendData.artist.map((artist, index) => (
                                                <BarChartElement number={index+1} name={artist.name} playcount={artist.playcount} value={(artist.playcount/trendData.artist[0].playcount)*100}/>
                                            ))
                                        )
                                    }
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table variant={'simple'} size={'sm'}>
                                    {
                                        trendData.album && (
                                            trendData.album.map((album,index) => (
                                                <BarChartElement number={index+1} name={album.name} playcount={album.playcount} value={(album.playcount/trendData.album[0].playcount)*100}/>
                                            ))
                                        )
                                    }
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table variant={'simple'} size={'sm'}>
                                    {
                                        trendData.track && (
                                            trendData.track.map((track, index) => (
                                                <BarChartElement number={index+1} name={track.name} playcount={track.playcount} image={track.image} value={(track.playcount/trendData.track[0].playcount)*100}/>
                                            ))
                                        )
                                    }
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Heading size={'md'} mt={3} mb={3}>Friends</Heading>
                <Wrap mb={20}>
                    {
                        friendData[1] && (
                            friendData.map(friend => (
                                <WrapItem onClick={() => {
                                    navigate(`/user/${friend.name}`)
                                    setUser(friend.name)
                                }}>
                                    <LinkBox>
                                        <LinkOverlay>
                                            <Tooltip label={friend.name} placement={'bottom'}>
                                                <Avatar size={'lg'} name={friend.name} src={friend.image[2]['#text']}/>
                                            </Tooltip>
                                        </LinkOverlay>
                                    </LinkBox>
                                </WrapItem>
                            ))
                        )
                    }
                </Wrap>
            </Container>
        </div>
    )
}

export default UserPage
