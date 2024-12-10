<template>
    <div class="programs-schedule">
      <header>
        <h2>節目表</h2>
        <div class="filter">
          <label for="date">日期查詢：</label>
          <input type="date" id="date" v-model="selectedDate" @change="filterPrograms" />
        </div>
      </header>
      
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Program ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="program in filteredPrograms" :key="program.id">
              <td>{{ program.id }}</td>
              <td>{{ program.title }}</td>
              <td>{{ program.description }}</td>
              <td>{{ program.date }}</td>
              <td>{{ program.start_time }}</td>
              <td>{{ program.end_time }}</td>
              <td>{{ program.duration }}</td>
              <td>{{ program.location }}</td>
              <td class="action-icons">
                <i class="fa-solid fa-pen-to-square" @click="editProgram(program.id)"></i>
                <i class="fa-solid fa-trash-can" @click="deleteProgram(program.id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProgramsSchedule",
    data() {
      return {
        selectedDate: "",
        
        programs: [
        
        {
            "id": 1,
            "title": "海豹餵食解說",
            "description": "解說海豹的飲食習性與特點",
            "date": "2025/1/1",
            "start_time": "10:00",
            "end_time": "10:15",
            "duration": "15分鐘",
            "location": "世界水域館",
            "image": "/img/Programs_Schedule/seal_feeding.jpg"
        },
        {
            "id": 2,
            "title": "與魚共舞",
            "description": "介紹魚類的群體行為，展示生態平衡的重要性",
            "date": "2025/1/2",
            "start_time": "10:00",
            "end_time": "10:15",
            "duration": "15分鐘",
            "location": "深水區",
            "image": "/img/Programs_Schedule/fish_dance.jpg"
        },
        {
            "id": 3,
            "title": "企鵝探險之旅",
            "description": "導覽企鵝的棲息地與繁殖習性",
            "date": "2025/1/3",
            "start_time": "10:00",
            "end_time": "10:20",
            "duration": "20分鐘",
            "location": "企鵝區",
            "image": "/img/Programs_Schedule/penguin_exploration.jpg"
        },
        {
            "id": 4,
            "title": "與魚共舞",
            "description": "介紹魚類的群體行為，展示生態平衡的重要性",
            "date": "2025/1/3",
            "start_time": "14:30",
            "end_time": "14:45",
            "duration": "15分鐘",
            "location": "深水區",
            "image": "/img/Programs_Schedule/fish_dance.jpg"
        },
        {
            "id": 5,
            "title": "海洋音樂會",
            "description": "演奏海洋主題的經典曲目，適合親子參加",
            "date": "2025/1/4",
            "start_time": "10:00",
            "end_time": "10:30",
            "duration": "30分鐘",
            "location": "舞台",
            "image": "/img/Programs_Schedule/ocean_music.jpg"
        },
        {
            "id": 6,
            "title": "企鵝探險之旅",
            "description": "導覽企鵝的棲息地與繁殖習性",
            "date": "2025/1/4",
            "start_time": "14:30",
            "end_time": "14:50",
            "duration": "20分鐘",
            "location": "企鵝區",
            "image": "/img/Programs_Schedule/penguin_exploration.jpg"
        },
        {
            "id": 7,
            "title": "鯊魚解說秀",
            "description": "介紹鯊魚的生態與獵食技巧",
            "date": "2025/1/5",
            "start_time": "10:00",
            "end_time": "10:30",
            "duration": "30分鐘",
            "location": "淺水區",
            "image": "/img/Programs_Schedule/shark_show.jpg"
        },
        {
            "id": 8,
            "title": "海洋音樂會",
            "description": "演奏海洋主題的經典曲目，適合親子參加",
            "date": "2025/1/5",
            "start_time": "14:30",
            "end_time": "15:00",
            "duration": "30分鐘",
            "location": "舞台",
            "image": "/img/Programs_Schedule/ocean_music.jpg"
        },
        {
            "id": 9,
            "title": "海洋保育互動遊戲",
            "description": "結合遊戲與教育，讓兒童學習保護海洋的知識",
            "date": "2025/1/6",
            "start_time": "10:00",
            "end_time": "10:25",
            "duration": "25分鐘",
            "location": "淺水區",
            "image": "/img/Programs_Schedule/ocean_conservation_game.jpg"
        },
        {
            "id": 10,
            "title": "神秘深海探索秀",
            "description": "展示深海生物的奇特外觀與生活習性",
            "date": "2025/1/6",
            "start_time": "14:30",
            "end_time": "14:50",
            "duration": "20分鐘",
            "location": "深水區",
            "image": "/img/Programs_Schedule/deep_sea_exploration.jpg"
        }
          
        ],
        filteredPrograms: [],
      };
    },
    methods: {
      filterPrograms() {
        if (this.selectedDate) {
          this.filteredPrograms = this.programs.filter(
            (program) => program.date === this.selectedDate
          );
        } else {
          this.filteredPrograms = this.programs;
        }
      },
      editProgram(id) {
        alert(`Edit program with ID: ${id}`);
      },
      deleteProgram(id) {
        this.filteredPrograms = this.filteredPrograms.filter(
          (program) => program.id !== id
        );
        alert(`Deleted program with ID: ${id}`);
      },
    },
    mounted() {
      this.filteredPrograms = this.programs;
    },
  };
  </script>
  
  <style scoped>
  .programs-schedule {
    margin: 20px;
    font-family: Arial, sans-serif;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #333;
  }
  
  .filter label {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .table-container {
    max-width: 100%;
    overflow-x: auto;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 16px;
  }
  
  .table th {
    background-color: #f4f4f4;
    color: #333;
    text-align: center;
    padding: 12px 10px;
    border: 1px solid #ddd;
  }
  
  .table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .table tr:hover {
    background-color: #f1f1f1;
  }
  
  .table td.action-icons {
    text-align: center;
  }
  
  .action-icons i {
    margin: 0 5px;
    cursor: pointer;
    color: #007bff;
  }
  
  .action-icons i:hover {
    color: #0056b3;
  }
  </style>
  