// Dữ liệu giả lập cho InfoSound. Nghệ sĩ và bài hát là EDM có thật; lượt nghe, lượt thích, lượt đăng lại là số giả lập.
import { seededRandom } from '../utils/format';

export const currentUser = {
  id: 'chu-duc-anh',
  name: 'Chử Đức Anh',
  handle: 'chuducanh',
  email: 'chuducanh@infosound.vn',
  location: 'Hà Nội',
  bio: 'Nghe EDM mỗi ngày. Fan của Martin Garrix, Kygo và Avicii.',
};

export const artists = [
  { id: 'martin-garrix', name: 'Martin Garrix', handle: 'martingarrix', location: 'Amstelveen, Hà Lan', followers: 1284000, following: 142, verified: true, bio: 'DJ và producer người Hà Lan. Nổi tiếng toàn cầu từ năm 17 tuổi với bản big room "Animals".' },
  { id: 'kygo', name: 'Kygo', handle: 'kygo', location: 'Bergen, Na Uy', followers: 1126400, following: 88, verified: true, bio: 'DJ, producer người Na Uy, một trong những nghệ sĩ đưa tropical house lên dòng nhạc chính.' },
  { id: 'gryffin', name: 'Gryffin', handle: 'gryffin', location: 'San Francisco, Mỹ', followers: 542100, following: 140, verified: true, bio: 'Producer người Mỹ, đưa guitar và piano chơi trực tiếp vào melodic house và future bass.' },
  { id: 'deamn', name: 'DEAMN', handle: 'deamn', location: '', followers: 367800, following: 53, verified: true, bio: 'Nghệ sĩ EDM với những bản melodic giàu năng lượng.' },
  { id: 'alan-walker', name: 'Alan Walker', handle: 'alanwalker', location: 'Bergen, Na Uy', followers: 1509400, following: 210, verified: true, bio: 'DJ, producer người Na Uy gốc Anh. Gắn liền với chiếc mặt nạ và bản hit "Faded".' },
  { id: 'avicii', name: 'Avicii', handle: 'avicii', location: 'Stockholm, Thuỵ Điển', followers: 1835600, following: 12, verified: true, bio: 'DJ, producer người Thuỵ Điển (1989–2018), người định hình progressive house của thập niên 2010.' },
  { id: 'illenium', name: 'ILLENIUM', handle: 'illenium', location: 'Denver, Mỹ', followers: 715300, following: 64, verified: true, bio: 'Producer người Mỹ, gương mặt tiêu biểu của melodic bass và future bass.' },
  { id: 'zedd', name: 'Zedd', handle: 'zedd', location: 'Kaiserslautern, Đức', followers: 905800, following: 102, verified: true, bio: 'DJ, producer người Đức gốc Nga. Chủ nhân giải Grammy với "Clarity".' },
  { id: 'chu-duc-anh', name: 'Chử Đức Anh', handle: 'chuducanh', location: 'Hà Nội', followers: 128, following: 4, verified: false, bio: 'Nghe EDM mỗi ngày. Fan của Martin Garrix, Kygo và Avicii.' },
];

export const tracks = [
  { id: 't1', title: 'Animals', artistId: 'martin-garrix', genre: 'Big room', duration: 304, plays: 3820000, likes: 142100, reposts: 23900, uploaded: '2 ngày trước', tags: ['bigroom', 'festival', 'edm'], description: 'Bản big room đưa Martin Garrix nổi tiếng toàn cầu năm 2013, khi anh mới 17 tuổi.' },
  { id: 't2', title: 'Scared to Be Lonely', artistId: 'martin-garrix', genre: 'Future bass', duration: 220, plays: 4150000, likes: 198400, reposts: 32200, uploaded: '5 ngày trước', tags: ['futurebass', 'dualipa', 'edm'], description: 'Martin Garrix hợp tác cùng Dua Lipa, phát hành năm 2017.' },
  { id: 't3', title: 'In the Name of Love', artistId: 'martin-garrix', genre: 'Future bass', duration: 195, plays: 2960000, likes: 109100, reposts: 14400, uploaded: '1 tuần trước', tags: ['futurebass', 'beberexha'], description: 'Martin Garrix hợp tác cùng Bebe Rexha, phát hành năm 2016.' },
  { id: 't4', title: 'Firestone', artistId: 'kygo', genre: 'Tropical house', duration: 272, plays: 2540000, likes: 93200, reposts: 15100, uploaded: '3 ngày trước', tags: ['tropical', 'summer', 'edm'], description: 'Đĩa đơn đầu tay của Kygo (2014), giọng hát Conrad Sewell.' },
  { id: 't5', title: 'Stole the Show', artistId: 'kygo', genre: 'Tropical house', duration: 223, plays: 1980000, likes: 75200, reposts: 9610, uploaded: '2 tuần trước', tags: ['tropical', 'chill'], description: 'Kygo cùng Parson James, phát hành năm 2015.' },
  { id: 't6', title: "It Ain't Me", artistId: 'kygo', genre: 'Tropical house', duration: 220, plays: 3370000, likes: 138700, reposts: 17400, uploaded: '4 ngày trước', tags: ['tropical', 'selenagomez'], description: 'Kygo hợp tác cùng Selena Gomez, phát hành năm 2017.' },
  { id: 't7', title: 'Tie Me Down', artistId: 'gryffin', genre: 'Future bass', duration: 218, plays: 1420000, likes: 61800, reposts: 7900, uploaded: '6 ngày trước', tags: ['futurebass', 'melodic'], description: 'Gryffin cùng Elley Duhé, phát hành năm 2018.' },
  { id: 't8', title: 'Body Back', artistId: 'gryffin', genre: 'Future bass', duration: 205, plays: 689000, likes: 33600, reposts: 4420, uploaded: '1 ngày trước', tags: ['futurebass', 'melodic'], description: 'Gryffin cùng Maia Wright, phát hành năm 2019.' },
  { id: 't9', title: 'Feel Good', artistId: 'gryffin', genre: 'Future bass', duration: 248, plays: 1130000, likes: 49800, reposts: 6100, uploaded: '3 tuần trước', tags: ['futurebass', 'illenium'], description: 'Gryffin và ILLENIUM, giọng hát Daya (2017).' },
  { id: 't10', title: 'Save Me', artistId: 'deamn', genre: 'Electro house', duration: 187, plays: 865000, likes: 41300, reposts: 5800, uploaded: '1 tháng trước', tags: ['electro', 'melodic', 'edm'], description: 'Một trong những bản được nghe nhiều nhất của DEAMN.' },
  { id: 't11', title: 'Kill Me Slowly', artistId: 'deamn', genre: 'Electro house', duration: 160, plays: 542000, likes: 22400, reposts: 3190, uploaded: '5 ngày trước', tags: ['electro', 'edm'], description: 'Bản EDM sôi động, drop dễ nhớ.' },
  { id: 't12', title: 'Faded', artistId: 'alan-walker', genre: 'Electro house', duration: 212, plays: 5210000, likes: 217600, reposts: 33300, uploaded: '2 tuần trước', tags: ['electro', 'alanwalker', 'edm'], description: 'Phát hành cuối năm 2015, giọng hát Iselin Solheim.' },
  { id: 't13', title: 'Alone', artistId: 'alan-walker', genre: 'Electro house', duration: 163, plays: 2070000, likes: 84900, reposts: 12600, uploaded: '1 tuần trước', tags: ['electro', 'alanwalker'], description: 'Phát hành năm 2016, giọng hát Noonie Bao.' },
  { id: 't14', title: 'Wake Me Up', artistId: 'avicii', genre: 'Progressive house', duration: 247, plays: 4880000, likes: 206300, reposts: 28800, uploaded: '1 tháng trước', tags: ['progressive', 'avicii', 'classic'], description: 'Kết hợp EDM với chất folk, giọng hát Aloe Blacc (2013).' },
  { id: 't15', title: 'The Nights', artistId: 'avicii', genre: 'Progressive house', duration: 176, plays: 3040000, likes: 128700, reposts: 15600, uploaded: '3 tuần trước', tags: ['progressive', 'avicii'], description: 'Phát hành năm 2014, giọng hát Nicholas Furlong.' },
  { id: 't16', title: 'Levels', artistId: 'avicii', genre: 'Progressive house', duration: 199, plays: 2230000, likes: 94900, reposts: 11700, uploaded: '2 tháng trước', tags: ['progressive', 'classic'], description: 'Bản progressive house kinh điển năm 2011, sample giọng Etta James.' },
  { id: 't17', title: 'Good Things Fall Apart', artistId: 'illenium', genre: 'Future bass', duration: 217, plays: 1260000, likes: 57400, reposts: 6900, uploaded: '4 ngày trước', tags: ['futurebass', 'melodicbass'], description: 'ILLENIUM cùng Jon Bellion, phát hành năm 2019.' },
  { id: 't18', title: 'Clarity', artistId: 'zedd', genre: 'Electro house', duration: 271, plays: 1740000, likes: 70200, reposts: 8300, uploaded: '6 ngày trước', tags: ['electro', 'grammy'], description: 'Zedd cùng Foxes, từng thắng Grammy cho Bản thu Dance xuất sắc nhất.' },
];

export const playlists = [
  { id: 'p1', title: 'EDM chạy bộ buổi sáng', curatorId: 'infosound', type: 'Playlist', trackIds: ['t1', 't16', 't18', 't7', 't8', 't15'], description: 'Big room, progressive house và future bass để giữ nhịp chạy.' },
  { id: 'p2', title: 'Tropical house mùa hè', curatorId: 'infosound', type: 'Playlist', trackIds: ['t4', 't5', 't6', 't9', 't10'], description: 'Nắng, biển và những giai điệu tropical nhẹ nhàng.' },
  { id: 'p3', title: 'EDM để code đêm', curatorId: 'chu-duc-anh', type: 'Playlist', trackIds: ['t12', 't13', 't17', 't10', 't11', 't18'], description: 'Playlist mình hay nghe khi làm bài tập lập trình web.' },
  { id: 'p4', title: 'Martin Garrix Essentials', curatorId: 'martin-garrix', type: 'Playlist', trackIds: ['t1', 't2', 't3'], description: 'Những bản hit tiêu biểu của Martin Garrix.' },
  { id: 'p5', title: 'EDM thịnh hành tuần này', curatorId: 'infosound', type: 'Playlist', trackIds: ['t6', 't2', 't12', 't14', 't11', 't9'], description: 'Những bản EDM được nghe nhiều nhất trên InfoSound tuần này.' },
  { id: 'p6', title: 'Tưởng nhớ Avicii', curatorId: 'infosound', type: 'Playlist', trackIds: ['t14', 't15', 't16'], description: 'Những bản nhạc làm nên tên tuổi Avicii.' },
];

export const moods = [
  { id: 'Big room', label: 'Big room', note: 'Drop sân khấu lớn' },
  { id: 'Future bass', label: 'Future bass', note: 'Giai điệu, cảm xúc' },
  { id: 'Tropical house', label: 'Tropical house', note: 'Nắng và biển' },
  { id: 'Progressive house', label: 'Progressive house', note: 'Lễ hội, bùng nổ' },
  { id: 'Electro house', label: 'Electro house', note: 'Năng lượng cao' },
];

// Bảng tin: đăng mới hoặc đăng lại từ những người đang theo dõi
export const feed = [
  { trackId: 't8', by: 'gryffin', type: 'post', ago: '1 ngày trước' },
  { trackId: 't9', by: 'gryffin', type: 'repost', ago: '3 giờ trước' },
  { trackId: 't1', by: 'martin-garrix', type: 'post', ago: '2 ngày trước' },
  { trackId: 't4', by: 'kygo', type: 'post', ago: '3 ngày trước' },
  { trackId: 't14', by: 'martin-garrix', type: 'repost', ago: '5 ngày trước' },
  { trackId: 't6', by: 'kygo', type: 'post', ago: '4 ngày trước' },
  { trackId: 't2', by: 'martin-garrix', type: 'post', ago: '5 ngày trước' },
  { trackId: 't15', by: 'avicii', type: 'post', ago: '3 tuần trước' },
];

export const notifications = [
  { id: 'n1', who: 'gryffin', text: 'vừa đăng Body Back', ago: '12 phút' },
  { id: 'n2', who: 'martin-garrix', text: 'vừa đăng Animals', ago: '2 ngày' },
  { id: 'n3', who: 'kygo', text: 'vừa đăng Firestone', ago: '3 ngày' },
];

// ---- Bình luận theo mốc thời gian trên dạng sóng ----
const commentPool = [
  'Đoạn này nghe nổi da gà', 'Ai nghe lúc 2 giờ sáng giống mình không', 'Cái drop này đỉnh thật',
  'Build-up đoạn này quá cuốn', 'Nghe ở festival còn phê hơn', 'Mix giọng quá sạch', 'Replay lần thứ 20',
  'Đoạn chuyển hợp âm đẹp quá', 'Huyền thoại EDM', 'Nghe để ôn thi rất ổn', 'Bass đoạn này dày ghê',
  'Tuổi thơ của mình đây', 'Mong có bản extended', 'Chỗ này hay nhất bài',
];
const commenters = ['Hoàng Nam', 'Thu Trang', 'Bảo Long', 'Khánh Linh', 'Đức Huy', 'Quỳnh Chi', 'Tuấn Kiệt', 'Hà My', 'Phương Thảo', 'Gia Bảo'];
const agos = ['vừa xong', '8 phút trước', '1 giờ trước', '5 giờ trước', 'hôm qua', '2 ngày trước', '1 tuần trước'];

export const comments = tracks.flatMap((t) => {
  const rand = seededRandom('c-' + t.id);
  const n = 4 + Math.floor(rand() * 6);
  return Array.from({ length: n }, (_, i) => ({
    id: `${t.id}-c${i}`,
    trackId: t.id,
    user: commenters[Math.floor(rand() * commenters.length)],
    text: commentPool[Math.floor(rand() * commentPool.length)],
    at: Math.floor(t.duration * (0.05 + rand() * 0.9)),
    ago: agos[Math.floor(rand() * agos.length)],
  }));
});

// ---- Hàm truy vấn ----
export const getArtist = (id) =>
  id === 'infosound'
    ? { id: 'infosound', name: 'InfoSound', handle: 'infosound', verified: true }
    : artists.find((a) => a.id === id);
export const getTrack = (id) => tracks.find((t) => t.id === id);
export const getPlaylist = (id) => playlists.find((p) => p.id === id);
export const tracksByArtist = (id) => tracks.filter((t) => t.artistId === id);
export const playlistsByArtist = (id) => playlists.filter((p) => p.curatorId === id);
export const commentsForTrack = (id) => comments.filter((c) => c.trackId === id).sort((a, b) => a.at - b.at);
export const playlistTracks = (p) => p.trackIds.map(getTrack).filter(Boolean);
export const playlistsWithTrack = (id) => playlists.filter((p) => p.trackIds.includes(id));
export const chart = [...tracks].sort((a, b) => b.plays - a.plays);
