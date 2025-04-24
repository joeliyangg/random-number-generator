document.addEventListener('DOMContentLoaded', () => {
  const initiatorView = document.getElementById('initiator-view');
  const receiverView = document.getElementById('receiver-view');
  const minInput = document.getElementById('min-value');
  const maxInput = document.getElementById('max-value');
  const saveBtn = document.getElementById('save-settings');
  const linkContainer = document.getElementById('link-container');
  const shareLinkInput = document.getElementById('share-link');
  const copyLinkBtn = document.getElementById('copy-link');
  const copyMsg = document.getElementById('copy-msg');
  const rangeInfo = document.getElementById('range-info');
  const generateBtn = document.getElementById('generate-btn');
  const resultEl = document.getElementById('result');

  const params = new URLSearchParams(window.location.search);
  if (params.has('min') && params.has('max')) {
    initiatorView.classList.add('hidden');
    receiverView.classList.remove('hidden');
    const min = parseInt(params.get('min'), 10);
    const max = parseInt(params.get('max'), 10);
    rangeInfo.textContent = `将在 ${min} 到 ${max} 之间生成随机数`;
    generateBtn.addEventListener('click', () => {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      resultEl.textContent = rand;
    });
  } else {
    initiatorView.classList.remove('hidden');
    receiverView.classList.add('hidden');
    saveBtn.addEventListener('click', () => {
      const min = parseInt(minInput.value, 10);
      const max = parseInt(maxInput.value, 10);
      if (isNaN(min) || isNaN(max) || min > max) {
        alert('请输入有效的最小值和最大值，且最小值不能大于最大值');
        return;
      }
      const url = `${window.location.origin}${window.location.pathname}?min=${min}&max=${max}`;
      shareLinkInput.value = url;
      linkContainer.classList.remove('hidden');
    });
    copyLinkBtn.addEventListener('click', () => {
      shareLinkInput.select();
      document.execCommand('copy');
      copyMsg.classList.remove('hidden');
      setTimeout(() => copyMsg.classList.add('hidden'), 2000);
    });
  }
});
