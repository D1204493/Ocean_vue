<template>
    <div class="container">
        <div class="price-card">
            <table class="price-table">
                <thead>
                    <tr>
                        <th class="ticket-type-header"></th>
                        <th class="table-header">平日</th>
                        <th class="table-header">假日</th>
                        <th class="opening-hours table-header">館場開放時間<br>/應注意事項</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in ticketTypes" :key="index">
                        <td class="ticket-type">{{ item.type }}</td>
                        <td class="price">
                            <span class="currency">$</span>{{ item.weekday }}
                        </td>
                        <td class="price">
                            <span class="currency">$</span>{{ item.weekend }}
                        </td>
                        <td v-if="index === 0" class="notice" rowspan="3">
                            平日:08:00-17:00<br>
                            假日:07:00-18:00<br><br>
                            *優待票：<br>
                            <div class="indent">
                                a. 6歲(含)以上之學童(身高達115公分以上)、大學(含)以上持有效學生證者、持有效榮民證、公教人員退休證之民眾。<br>
                                b. 應屆畢業生請持當年度准考證或當年度入學通知並連同身分證件購買優待票；空中大學請持學生證及該年度之選課卡購買優待票
                            </div>
                            *博愛票:65歲以上長者。<br>
                            *全票:一般民眾。
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="button-group">
            <button class="btn btn-primary">我的票夾</button>
            <button class="btn btn-secondary">前往訂票</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TicketPriceTable',
    data() {
        return {
            ticketTypes: [
                { type: '全票', weekday: 150, weekend: 200 },
                { type: '博愛票', weekday: 120, weekend: 150 },
                { type: '優待票', weekday: 75, weekend: 100 }
            ]
        }
    }
}
</script>

<style>
.container {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
}

.price-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e0e0e0;
    margin-bottom: 20px;
}

.price-table {
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    padding: 12px;
    text-align: left;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
}

.ticket-type-header {
    width: 100px;
}

.ticket-type {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    padding: 12px;
}

.price-table td {
    padding: 12px;
    border-top: 1px solid #eee;
}

.price {
    font-size: 18px;
    font-weight: bold;
}

.currency {
    font-size: 14px;
    margin-right: 2px;
}

.notice {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    padding: 12px 20px;
}

.indent {
  padding-left: 20px;
  margin: 5px 0;
}

.opening-hours {
    font-size: 18px;
    width: 30%;
}

.button-group {
    display: flex;
    gap: 100px;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
}

.btn {
    padding: 12px 35px;
    border-radius: 25px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

.btn-primary {
    background-color: #B4D132;
    color: white;
}

.btn-secondary {
    background-color: #E5A853;
    color: white;
}
</style>