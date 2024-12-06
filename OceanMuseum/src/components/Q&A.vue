<template>
    <div class="container">
        <div class="tab-container">
            <button class="tab-button" :class="{ active: activeTab === 'all', 'all-tab': activeTab === 'all' }"
                @click="activeTab = 'all'">
                全部
            </button>
            <button v-for="tab in tabs" :key="tab.id" class="tab-button" :class="{ active: activeTab === tab.id }"
                @click="activeTab = tab.id">
                {{ tab.name }}
            </button>
        </div>

        <div class="content-section">
            <h2 class="content-title">問題</h2>
            <div class="faq-container">
                <div v-for="(item, index) in paginatedQuestions" :key="index" class="faq-item">
                    <div class="question" @click="toggleAnswer(index)">
                        <span class="arrow" :class="{ 'arrow-expanded': expandedIndex === index }">›</span>
                        {{ item.question }}
                    </div>
                    <div class="answer" v-if="expandedIndex === index">
                        <div class="answer-content" v-html="item.answer"></div>
                    </div>
                </div>
            </div>

            <div class="pagination">
                <button 
                    class="page-button" 
                    @click="currentPage--" 
                    :disabled="currentPage === 1"
                >
                    上一頁
                </button>
                <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
                <button 
                    class="page-button" 
                    @click="currentPage++" 
                    :disabled="currentPage === totalPages"
                >
                    下一頁
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FaqComponent',
    data() {
        return {
            activeTab: 'all',
            expandedIndex: null,
            currentPage: 1,
            itemsPerPage: 6,
            tabs: [
                { id: 'traffic', name: '交通與住宿類' },
                { id: 'purchase', name: '購票與收費類' },
                { id: 'service', name: '網站與服務類' }
            ],
            questions: [],
        }
    },
    computed: {
        filteredQuestions() {
            if (this.activeTab === 'all') return this.questions;
            const categoryMap = {
                'traffic': '交通與住宿類',
                'service': '網站與服務類',
                'purchase': '購票與收費類'
            };
            return this.questions.filter(q => q.category === categoryMap[this.activeTab]);
        },
        totalPages() {
            return Math.ceil(this.filteredQuestions.length / this.itemsPerPage);
        },
        paginatedQuestions() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredQuestions.slice(start, end);
        }
    },
    methods: {
        toggleAnswer(index) {
            this.expandedIndex = this.expandedIndex === index ? null : index;
        },
        async fetchData() {
            try {
                const response = await fetch('http://localhost:8080/FAQ/get');
                this.questions = await response.json();
            } catch(error) {
                console.log('Failed to fetch FAQ data:', error);
            }
        },
    },
    watch: {
        activeTab() {
            this.currentPage = 1;
            this.expandedIndex = null;
        }
    },
    created() {
        this.fetchData();
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.tab-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.tab-button {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 14px;
}

.all-tab {
    background: #D4A017;
    color: white;
    border: none;
}

.tab-button.active {
    background: #D4A017;
    color: white;
    border: none;
}

.content-section {
    background: #FFF3E0;
    border-radius: 8px;
    padding: 20px;
}

.content-title {
    margin: 0;
    padding: 0 0 15px 0;
    font-size: 18px;
    text-align: center;
}

.faq-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.faq-item {
    background: white;
    padding: 15px;
    border-radius: 4px;
}

.question {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.arrow {
    color: #666;
    font-size: 20px;
    transition: transform 0.3s ease;
}

.arrow-expanded {
    transform: rotate(90deg);
}

.answer {
    margin-top: 10px;
    padding-left: 30px;
    color: #666;
}

.answer-content {
    line-height: 1.6;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.page-button {
    padding: 8px 16px;
    border: 1px solid #D4A017;
    border-radius: 20px;
    background: white;
    color: #D4A017;
    cursor: pointer;
}

.page-button:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
}

.page-info {
    font-size: 14px;
    color: #666;
}

@media (min-width: 1024px) {
    .content-section {
        width: 1000px;
    }
}
</style>