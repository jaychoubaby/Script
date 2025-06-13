document.addEventListener('DOMContentLoaded', () => {
    // 定义常量
    const COURTS = {
        'lakeside': {
            title: '湖边网球场',
            projectId: '6281b4301fd84f72a9e00e24990532d6'
        },
        'new-court': {
            title: '新网球场',
            projectId: '18f9b46361334bfba0140261afc2cac9'
        },
        'old-three': {
            title: '老三片',
            projectId: '75247e82273443329ced078b419a3e5c'
        }
    };
    
    // 默认Token值
    const DEFAULT_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoyMDg1NDIsInVzZXJfa2V5IjoiMTAwYjg1MTQtMzFiMC00NTBiLWE5YjEtNDQ2ODM4ZmJhZWEzIiwidXNlcm5hbWUiOiJvbUh6bTR1ZDZxd21OajN4SzJkNk5rZUs4VWdVIn0.vwxjMgtZYXQJcLao2KTCOM8RI7o12qUh4WzzutIV4lxga8_XmYulgC2UOBtPB5CEB0x4SzwzvenENDxKLO29iQ';
    
    // 获取DOM元素
    const datePicker = document.getElementById('date-picker');
    const authTokenInput = document.getElementById('auth-token');
    const courtButtons = document.querySelectorAll('.court-btn');
    const courtTitle = document.getElementById('court-title');
    const weekdayDisplay = document.getElementById('weekday');
    const courtsContainer = document.getElementById('courts-container');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const toggleViewBtn = document.getElementById('toggle-view');
    const actionToast = document.getElementById('action-toast');
    const selectedCountDisplay = document.getElementById('selected-count');
    const currentDatetime = document.getElementById('current-datetime');
    const usernameDisplay = document.getElementById('username');
    
    // 更新当前时间和用户名
    currentDatetime.textContent = '2025-06-13 07:33:14';
    usernameDisplay.textContent = 'jaychoubaby';
    
    // 设置默认token值，保留用户已输入的值
    authTokenInput.value = authTokenInput.value || DEFAULT_TOKEN;
    
    // Token输入监听事件 - 即时保存用户输入的token
    authTokenInput.addEventListener('input', () => {
        // 如果需要，可以在这里添加Token值的即时验证逻辑
        localStorage.setItem('userToken', authTokenInput.value);
    });
    
    // 从localStorage加载用户上次输入的token（如果有）
    if (localStorage.getItem('userToken')) {
        authTokenInput.value = localStorage.getItem('userToken');
    }
    
    // 视图模式（卡片或表格）
    let viewMode = 'card';
    toggleViewBtn.textContent = '切换为表格视图';
    
    // 设置默认日期为今天
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    datePicker.value = formattedToday;
    
    // 当前选中的场地
    let currentCourtId = 'lakeside';
    
    // 选中的时间段
    let selectedSlots = [];
    
    // 获取星期几
    function getWeekdayInChinese(dateString) {
        const date = new Date(dateString);
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return weekdays[date.getDay()];
    }

    // 初始化周几显示
    updateWeekdayDisplay(datePicker.value);
    
    // 加载初始场地数据
    loadCourtData();
    
    // 日期选择器事件监听
    datePicker.addEventListener('change', () => {
        updateWeekdayDisplay(datePicker.value);
        selectedSlots = []; // 切换日期时清空选中的时间段
        updateSelectedCountDisplay();
        loadCourtData();
    });
    
    // 场地按钮事件监听
    courtButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            courtButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前按钮添加active类
            button.classList.add('active');
            // 更新当前场地ID
            currentCourtId = button.id;
            // 更新场地标题
            courtTitle.textContent = COURTS[currentCourtId].title;
            // 重新加载数据
            loadCourtData();
        });
    });
    
    // 切换视图模式（卡片/表格）
    toggleViewBtn.addEventListener('click', () => {
        viewMode = viewMode === 'card' ? 'table' : 'card';
        toggleViewBtn.textContent = viewMode === 'card' ? '切换为表格视图' : '切换为卡片视图';
        
        // 重新渲染当前数据
        if (lastFetchedData) {
            renderCourtData(lastFetchedData);
        }
    });
    
    // 更新选中时间段计数显示
    function updateSelectedCountDisplay() {
        selectedCountDisplay.textContent = `已选择：${selectedSlots.length}个`;
    }
    
    // 显示提示消息
    function showToast(message) {
        actionToast.textContent = message;
        actionToast.classList.add('show');
        setTimeout(() => {
            actionToast.classList.remove('show');
        }, 2000);
    }
    
    function updateWeekdayDisplay(dateString) {
        const weekday = getWeekdayInChinese(dateString);
        weekdayDisplay.textContent = `${dateString} ${weekday}`;
        return weekday;
    }
    
    // 保存最后一次获取的数据，用于切换视图时重新渲染
    let lastFetchedData = null;
    
    // 清除数据并显示错误
    function clearDataAndShowError(message) {
        // 清空缓存数据
        lastFetchedData = null;
        // 清空场地容器
        courtsContainer.innerHTML = '';
        // 清空选择的时间段
        selectedSlots = [];
        // 更新选择计数
        updateSelectedCountDisplay();
        // 显示错误消息
        showError(message);
    }
    
    // 添加重试按钮
    function addRetryButton() {
        const retryBtn = document.createElement('button');
        retryBtn.textContent = '重新加载数据';
        retryBtn.className = 'action-btn';
        retryBtn.style.marginTop = '10px';
        retryBtn.addEventListener('click', () => {
            loadCourtData();
        });
        
        // 确保之前没有重试按钮
        const existingRetryBtn = errorMessage.querySelector('button');
        if (!existingRetryBtn) {
            errorMessage.appendChild(document.createElement('br'));
            errorMessage.appendChild(retryBtn);
        }
    }
    
    // 获取场地数据
    async function loadCourtData() {
        showLoading(true);
        hideError();
        
        try {
            const date = datePicker.value;
            const weekday = getWeekdayInChinese(date);
            const encodedWeekday = encodeURIComponent(weekday);
            const projectId = COURTS[currentCourtId].projectId;
            
            // 使用用户输入的token，如果为空则使用默认值
            const currentToken = authTokenInput.value.trim() || DEFAULT_TOKEN;
            
            const url = `http://123.57.187.93:8073/api/prod-api/system/price/scheme/priceStateAllByDateAndProject?stadiumsId=f6f54d53f4c84a09addae1221ebe6313&projectId=${projectId}&appointedDay=${date}&week=${encodedWeekday}`;
            // const url = `https://wxgym.whsu.edu.cn/prod-api/system/price/scheme/priceStateAllByDateAndProject?stadiumsId=f6f54d53f4c84a09addae1221ebe6313&projectId=${projectId}&appointedDay=${date}&week=${encodedWeekday}`;
            
            try {
                // 注意：在实际部署时，这里会因为浏览器的同源策略导致请求失败
                // 需要设置代理服务器或后端API转发请求
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': currentToken
                    }
                });
                
                if (!response.ok) {
                    // 清除数据并显示错误
                    clearDataAndShowError(`API请求失败，状态码: ${response.status}，请检查Token有效性`);
                    addRetryButton();
                    throw new Error(`API请求失败，状态码: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.code !== 200) {
                    // 清除数据并显示错误
                    clearDataAndShowError(`API错误: ${data.msg}，请检查Token有效性`);
                    addRetryButton();
                    throw new Error(`API错误: ${data.msg}`);
                }
                
                lastFetchedData = data.data;
                renderCourtData(data.data);
                
                // 如果成功，保存当前使用的token
                localStorage.setItem('userToken', currentToken);
                
            } catch (error) {
                console.error('API请求失败:', error);
                clearDataAndShowError(`API请求失败: ${error.message}，请检查网络连接、Token值或尝试刷新页面`);
                addRetryButton();
            }
        } catch (error) {
            console.error('获取场地数据失败:', error);
            clearDataAndShowError(`获取场地数据失败: ${error.message}，请稍后重试`);
            addRetryButton();
        } finally {
            showLoading(false);
        }
    }
    
    function showLoading(isLoading) {
        loading.className = isLoading ? 'loading show' : 'loading';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function hideError() {
        errorMessage.style.display = 'none';
    }
    
    // 判断时间段是否被选中
    function isSlotSelected(slotId) {
        return selectedSlots.some(slot => slot.id === slotId);
    }
    
    // 切换时间段的选中状态
    function toggleSlotSelection(slot, courtName) {
        const index = selectedSlots.findIndex(s => s.id === slot.id);
        if (index === -1) {
            // 添加到选中列表
            selectedSlots.push({
                id: slot.id,
                schemeId: slot.schemeId,
                siteId: slot.siteId,
                siteName: courtName || slot.siteName || '',
                startTime: slot.startTime,
                endTime: slot.endTime,
                date: slot.reserveDate,  // 确保保存日期信息
                price: slot.price  // 直接使用原始价格值
            });
        } else {
            // 从选中列表中移除
            selectedSlots.splice(index, 1);
        }
        
        // 更新已选择数量显示
        updateSelectedCountDisplay();
    }
    
    // 渲染场地数据
    function renderCourtData(courtData) {
        // 清空场地容器
        courtsContainer.innerHTML = '';
        
        if (!courtData || courtData.length === 0) {
            showError('没有找到场地数据');
            return;
        }
        
        // 对场地按名称排序
        const sortedCourts = [...courtData].sort((a, b) => {
            // 从场地名称中提取数字进行排序
            const numA = parseInt(a.siteName.match(/\d+/) || ['0']);
            const numB = parseInt(b.siteName.match(/\d+/) || ['0']);
            return numA - numB;
        });
        
        // 根据视图模式选择渲染方式
        if (viewMode === 'card') {
            courtsContainer.className = 'courts-container card-view';
            renderCardView(sortedCourts);
        } else {
            courtsContainer.className = 'courts-container table-view';
            renderTableView(sortedCourts);
        }
        
        // 更新已选择数量显示
        updateSelectedCountDisplay();
    }
    
    // 卡片视图渲染
    function renderCardView(courts) {
        courts.forEach(court => {
            const courtCard = document.createElement('div');
            courtCard.className = 'court-card';
            
            const courtName = document.createElement('div');
            courtName.className = 'court-name';
            courtName.textContent = court.siteName || `场地${court.id}`;
            
            const courtSlots = document.createElement('div');
            courtSlots.className = 'court-slots';
            
            // 创建时间段如果存在
            if (court.priceSchemeStateVos && court.priceSchemeStateVos.length > 0) {
                // 按开始时间排序
                const sortedTimeSlots = [...court.priceSchemeStateVos].sort((a, b) => {
                    return a.startTime.localeCompare(b.startTime);
                });
                
                sortedTimeSlots.forEach(slot => {
                    // 确保slot有日期字段，默认使用datePicker.value
                    slot.reserveDate = slot.reserveDate || datePicker.value;
                    
                    // 为slot添加场地名称
                    slot.siteName = court.siteName;
                    
                    // 创建时间段元素
                    const timeSlot = document.createElement('div');
                    let statusClass = '';
                    let statusText = '';
                    
                    // 根据reserveState确定状态
                    if (slot.reserveState === '5') {
                        statusClass = 'available';
                        statusText = '可预订';
                    } else if (slot.reserveState === '1') {
                        statusClass = 'occupied';
                        statusText = '已预订';
                    } else if (slot.reserveState === '6') {
                        statusClass = 'unavailable';
                        statusText = '不可用';
                    } else {
                        statusClass = 'unavailable';
                        statusText = '其他状态';
                    }
                    
                    // 检查是否被选中
                    if (isSlotSelected(slot.id)) {
                        statusClass = 'selected';
                        statusText = '已选择';
                    }
                    
                    timeSlot.className = `time-slot ${statusClass}`;
                    
                    // 只有可预订的时间段才能点击选择 - 整个卡片可点击
                    if (slot.reserveState === '5' || isSlotSelected(slot.id)) {
                        timeSlot.addEventListener('click', () => {
                            toggleSlotSelection(slot, court.siteName);
                            // 重新渲染以更新视图
                            renderCourtData(lastFetchedData);
                        });
                    }
                    
                    // 时间段头部信息（时间和价格）
                    const slotHeader = document.createElement('div');
                    slotHeader.className = 'slot-header';
                    
                    const slotTime = document.createElement('div');
                    slotTime.className = 'slot-time';
                    slotTime.textContent = `${slot.startTime.substring(0, 5)}-${slot.endTime.substring(0, 5)}`;
                    
                    const slotPrice = document.createElement('div');
                    slotPrice.className = 'slot-price';
                    slotPrice.textContent = `¥${slot.price}`;
                    
                    slotHeader.appendChild(slotTime);
                    slotHeader.appendChild(slotPrice);
                    
                    // 状态信息
                    const status = document.createElement('div');
                    status.className = 'slot-status';
                    status.textContent = statusText;
                    
                    // 备注信息（如果有）
                    if (slot.sremark) {
                        const remark = document.createElement('div');
                        remark.className = 'slot-remark';
                        remark.textContent = `备注: ${slot.sremark}`;
                        timeSlot.appendChild(remark);
                    }
                    
                    timeSlot.appendChild(slotHeader);
                    timeSlot.appendChild(status);
                    
                    courtSlots.appendChild(timeSlot);
                });
            } else {
                const noSlots = document.createElement('div');
                noSlots.textContent = '没有可用的时间段';
                courtSlots.appendChild(noSlots);
            }
            
            courtCard.appendChild(courtName);
            courtCard.appendChild(courtSlots);
            courtsContainer.appendChild(courtCard);
        });
    }
    
    // 表格视图渲染
    function renderTableView(courts) {
        // 创建表格
        const table = document.createElement('table');
        table.className = 'court-table';
        
        // 获取所有可能的时间段
        const allTimeSlots = new Set();
        courts.forEach(court => {
            if (court.priceSchemeStateVos) {
                court.priceSchemeStateVos.forEach(slot => {
                    allTimeSlots.add(`${slot.startTime}-${slot.endTime}`);
                });
            }
        });
        
        // 将时间段转为数组并排序
        const timeSlots = Array.from(allTimeSlots).sort();
        
        // 创建表头
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // 时间列
        const timeHeader = document.createElement('th');
        timeHeader.textContent = '时间';
        headerRow.appendChild(timeHeader);
        
        // 场地列
        courts.forEach(court => {
            const courtHeader = document.createElement('th');
            courtHeader.textContent = court.siteName || `场地${court.id}`;
            headerRow.appendChild(courtHeader);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // 创建表体
        const tbody = document.createElement('tbody');
        
        // 为每个时间段创建行
        timeSlots.forEach(timeSlot => {
            const row = document.createElement('tr');
            
            // 时间单元格
            const timeCell = document.createElement('td');
            timeCell.className = 'time-cell';
            timeCell.textContent = timeSlot;
            row.appendChild(timeCell);
            
            // 每个场地该时间段的状态
            courts.forEach(court => {
                const cell = document.createElement('td');
                
                // 查找该场地该时间段的信息
                const [startTime, endTime] = timeSlot.split('-');
                const slotInfo = court.priceSchemeStateVos?.find(
                    slot => slot.startTime === startTime && slot.endTime === endTime
                );
                
                if (slotInfo) {
                    // 确保slotInfo有日期字段
                    slotInfo.reserveDate = slotInfo.reserveDate || datePicker.value;
                    
                    // 为slotInfo添加场地名称
                    slotInfo.siteName = court.siteName;
                    
                    let cellClass = '';
                    let statusText = '';
                    
                    // 根据reserveState确定状态
                    if (slotInfo.reserveState === '5') {
                        cellClass = 'cell-available';
                        statusText = '可预订';
                    } else if (slotInfo.reserveState === '1') {
                        cellClass = 'cell-occupied';
                        statusText = '已预订';
                    } else if (slotInfo.reserveState === '6') {
                        cellClass = 'cell-unavailable';
                        statusText = '不可用';
                    } else {
                        cellClass = 'cell-unavailable';
                        statusText = '其他状态';
                    }
                    
                    // 检查是否被选中
                    if (isSlotSelected(slotInfo.id)) {
                        cellClass = 'cell-selected';
                        statusText = '已选择';
                    }
                    
                    cell.className = cellClass;
                    
                    // 只有可预订的时间段才能点击选择
                    if (slotInfo.reserveState === '5' || isSlotSelected(slotInfo.id)) {
                        cell.addEventListener('click', () => {
                            toggleSlotSelection(slotInfo, court.siteName);
                            // 重新渲染以更新视图
                            renderCourtData(lastFetchedData);
                        });
                    }
                    
                    // 创建单元格内容
                    const cellContent = document.createElement('div');
                    
                    // 状态和价格
                    const statusDiv = document.createElement('div');
                    statusDiv.innerHTML = `<strong>${statusText}</strong>`;
                    cellContent.appendChild(statusDiv);
                    
                    const priceDiv = document.createElement('div');
                    priceDiv.textContent = `¥${slotInfo.price}`;
                    cellContent.appendChild(priceDiv);
                    
                    // 备注（如果有）
                    if (slotInfo.sremark) {
                        const remarkDiv = document.createElement('div');
                        remarkDiv.textContent = slotInfo.sremark;
                        remarkDiv.style.fontSize = '11px';
                        remarkDiv.style.color = '#666';
                        cellContent.appendChild(remarkDiv);
                    }
                    
                    cell.appendChild(cellContent);
                } else {
                    cell.textContent = '无数据';
                    cell.className = 'cell-unavailable';
                }
                
                row.appendChild(cell);
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        courtsContainer.appendChild(table);
    }
});