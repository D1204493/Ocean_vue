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
                <div v-for="(item, index) in filteredQuestions" :key="index" class="faq-item">
                    <div class="question" @click="toggleAnswer(index)">
                        <span class="arrow" :class="{ 'arrow-expanded': expandedIndex === index }">›</span>
                        {{ item.question }}
                    </div>
                    <div class="answer" v-if="expandedIndex === index">
                        <div class="answer-content" v-html="item.answer"></div>
                    </div>
                </div>
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
            tabs: [
                { id: 'traffic', name: '交通與住宿類' },
                { id: 'purchase', name: '購票與收費類' },
                { id: 'service', name: '網站與服務類' }
            ],
            questions: [
                {
                    question: '是否能攜帶寵物入館？若寵物無法入館是否有寄放服務？',
                    answer: '海生館禁止攜帶寵物入館參觀，若您有攜帶寵物，於本館遊客中心處的服務台有提供寵物寄放區，請您持個人證件即可免費辦理。',
                    type: 'service'
                },
                {
                    question: '夜宿海生館是睡在海生館內嗎？',
                    answer: '夜宿活動地點在教育中心，並非在展示館內。',
                    type: 'traffic'
                },
                {
                    question: '是否有白鯨餵食演出？',
                    answer: '目前尚無白鯨餵食演出活動。',
                    type: 'service'
                }
            ]
        }
    },
    computed: {
        filteredQuestions() {
            if (this.activeTab === 'all') return this.questions;
            return this.questions.filter(q => q.type === this.activeTab);
        }
    },
    methods: {
        toggleAnswer(index) {
            this.expandedIndex = this.expandedIndex === index ? null : index;
        }
    }
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
    align-items: flex-start;
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

@media (min-width: 1024px) {
    .content-section {
        width: 1000px;
    }
}
</style>