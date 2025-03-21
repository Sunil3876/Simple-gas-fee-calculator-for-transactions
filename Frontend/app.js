// Make sure Web3 is injected (by MetaMask or any other provider)
if (typeof window.ethereum !== 'undefined') {
    var web3 = new Web3(window.ethereum);
    ethereum.request({ method: 'eth_requestAccounts' }).catch((err) => {
        console.log("User denied account access");
    });
} else {
    alert("Please install MetaMask or another Ethereum wallet extension.");
}

const contractAddress = "0x31323eA1088434e237a893636eF45947b4E8e58d"; // Replace with your deployed contract address
const abi = [[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gasLimit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gasPrice",
				"type": "uint256"
			}
		],
		"name": "calculateGasFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentGasPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGasLimitEstimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
    {
        "inputs": [
            { "internalType": "uint256", "name": "gasLimit", "type": "uint256" },
            { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }
        ],
        "name": "calculateGasFee",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentGasPrice",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getGasLimitEstimate",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "pure",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(abi, contractAddress);

document.getElementById("calculateFee").onclick = async function() {
    const gasLimit = document.getElementById("gasLimit").value;
    const gasPrice = document.getElementById("gasPrice").value;

    if (!gasLimit || !gasPrice) {
        document.getElementById("error-message").textContent = "Please enter both Gas Limit and Gas Price.";
        return;
    }

    // Calculate Gas Fee
    try {
        const fee = await contract.methods.calculateGasFee(gasLimit, gasPrice).call();
        document.getElementById("feeResult").textContent = "Gas Fee: " + fee + " Wei";

        // Fetch Current Gas Price
        const currentGasPrice = await contract.methods.getCurrentGasPrice().call();
        document.getElementById("currentGasPrice").textContent = "Current Gas Price: " + currentGasPrice + " Wei";

        // Fetch Gas Limit Estimate
        const gasLimitEstimate = await contract.methods.getGasLimitEstimate().call();
        document.getElementById("gasLimitEstimate").textContent = "Gas Limit Estimate: " + gasLimitEstimate + " Wei";

        document.getElementById("error-message").textContent = "";
    } catch (error) {
        document.getElementById("error-message").textContent = "Error: " + error.message;
    }
};
