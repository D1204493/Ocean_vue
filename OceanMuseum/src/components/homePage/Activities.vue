<template>

  <div class="announcement-section">
    <div class="section-header mb-4">
      <h3 class="text-center section-title">科教活動</h3>
    </div>
      <table class="table table-hover announcement-table">
        <thead>
          <tr>
            <th class="text-center">類型</th>
            <th class="text-center">日期</th>
            <th class="text-center">標題</th>
            <th class="text-center">內容</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="announcement in announcements"
            :key="announcement.id"
            class="announcement-row"
            @click="showAnnouncementDetail(announcement)"
          >
          <td class="text-center align-middle">
              <span class="announcement-category">{{ announcement.category }}</span>
            </td>
            <td class="text-center align-middle">{{ announcement.category }}</td>
            <td class="text-center align-middle">{{ announcement.date }}</td>
            <td class="text-center align-middle">{{ announcement.title }}</td>
            <td class="text-center align-middle">{{ announcement.details }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Activites',
      props: {
        announcements: {
          type: Array,
          required: true
        }
      },
      methods: {
        showAnnouncementDetail(announcement) {
          // TODO: 實作點擊後顯示詳細內容的功能
          console.log('Showing announcement details:', announcement);
        }
      }
    };
  </script>

  <style scoped>
    .announcement-table {
      margin-bottom: 0;
    }

    .announcement-table thead th {
      background-color: #f8f9fa;
      border-bottom: 2px solid #FFCD50;
      color: #334255;
      font-weight: 500;
      padding: 1rem;
    }

    .announcement-row {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .announcement-row:hover {
      background-color: #f8f9fa;
    }

    .announcement-category {
      display: inline-block;
      padding: 0.25rem 0.625rem;
      background-color: #334255;
      color: #fff;
      border-radius: 50px;
      font-size: 0.875rem;
    }

    td {
      padding: 1rem !important;
      color: #495057;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .announcement-type {
        padding: 0.15rem 0.5rem;
        font-size: 0.75rem;
      }
      
      td, th {
        padding: 0.75rem !important;
        font-size: 0.875rem;
      }
    }
  </style>