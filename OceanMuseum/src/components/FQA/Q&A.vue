<template>
    <div class="container">

        <div class="header-wrapper">
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

            <!-- 詢問AI Button -->
            <div class="header-section">
                <button class="gpt-button" @click="toggleChat">
                    <span class="gpt-icon">🤖</span>
                    詢問AI助理
                </button>
            </div>
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
                <button class="page-button" @click="currentPage--" :disabled="currentPage === 1">
                    上一頁
                </button>
                <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
                <button class="page-button" @click="currentPage++" :disabled="currentPage === totalPages">
                    下一頁
                </button>
            </div>
        </div>
    </div>
    

    <!-- 對話視窗 -->
    <div v-if="showChat" class="chat-dialog">
        <div class="chat-header">
            <span>AI助理</span>
            <button class="close-button" @click="toggleChat">×</button>
        </div>
        <div class="chat-body" ref="chatBody">
            <div v-for="(message, index) in messages" :key="index"
                :class="['chat-message', message.isUser ? 'user-message' : 'bot-message']">
                {{ message.text }}
            </div>
        </div>
        <div class="chat-footer">
            <input type="text" v-model="userInput" @keyup.enter="sendMessage" placeholder="輸入問題..." />
            <button class="send-button" @click="sendMessage">送出</button>
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
            showChat: false,
            userInput: "",
            messages: [],
            tabs: [
                { id: 'traffic', name: '交通與住宿類' },
                { id: 'purchase', name: '購票與收費類' },
                { id: 'service', name: '網站與服務類' }
            ],
            questions: [],
            isLoading: false,
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
            } catch (error) {
                console.log('Failed to fetch FAQ data:', error);
            }
        },
        toggleChat() {
            this.showChat = !this.showChat;
        },
        async sendMessage() {
            if (!this.userInput.trim() || this.isLoading) return;

            const userMessage = this.userInput.trim();
            this.messages.push({ text: userMessage, isUser: true });
            this.userInput = '';
            this.isLoading = true;

            try {
                const response = await fetch('http://localhost:8080/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || '系統發生錯誤');
                }

                this.messages.push({
                    text: data.response,
                    isUser: false
                });

                // 自動滾動到最新消息
                this.$nextTick(() => {
                    if (this.$refs.chatBody) {
                        this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
                    }
                });
            } catch (error) {
                console.error('Error:', error);
                this.messages.push({
                    text: `錯誤！${error.message || '系統發生錯誤，請稍後再試。'}`,
                    isUser: false
                });
            } finally {
                this.isLoading = false;
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
    padding: 10px 20px;
}

.header-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.gpt-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #dbe7f6;
    color: black;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
}

.gpt-button:hover {
    background: #4a90e2;
    color: white;
}

.gpt-icon {
    font-size: 16px;
}

.chat-dialog {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.chat-header {
    padding: 10px;
    background: #4a90e2;
    color: white;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.chat-message {
    margin: 5px;
    padding: 8px 12px;
    border-radius: 15px;
    max-width: 80%;
    word-wrap: break-word;
}

.user-message {
    background: #e6f7ff;
    margin-left: auto;
}

.bot-message {
    background: #f5f5f5;
    margin-right: auto;
}

.chat-footer {
    padding: 10px;
    display: flex;
    gap: 10px;
}

.chat-footer input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
}

.send-button {
    padding: 8px 15px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.send-button:hover {
    background: #15a76c;
}

@media (min-width: 1024px) {
    .content-section {
        width: 1000px;
    }
}
</style>