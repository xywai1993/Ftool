
/**
 * 显示当前字符数 以及控制最大输入字符
 * @param input  输入框  id
 * @param target  显示当前字符数的容器  id
 * @param max   最大字符数 number
 * @constructor
 */
function maxLength(input, target, max) {

	const inputDom = this.input = document.getElementById(input),
		targetDom = this.target = document.getElementById(target),
		maxNum = this.max = max;

	inputDom.addEventListener('focus', function () {
		const self = this;
		document.addEventListener('keyup', function () {

			if (self.value.length > max) {
				self.value = self.value.substr(0, maxNum);
				return;
			}
			targetDom.innerText = '' + self.value.length + '/' + max;
		});
	});
}