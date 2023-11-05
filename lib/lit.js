import * as LitJsSdk from "@lit-protocol/lit-node-client";

const chain = "optimism"
const litNodeClient = new LitJsSdk.LitNodeClient({
	litNetwork: 'cayenne',
});


const getAccessControlConditions = (id) => {
	return [
		{
		  contractAddress: '0xb24aEE5bcBb6d3B9eB8066EA2f48d19603fCe069',
		  standardContractType: 'ERC1155',
		  chain,
		  method: 'balanceOf',
		  parameters: [
			':userAddress',
			id
		  ],
		  returnValueTest: {
			comparator: '>',
			value: '0'
		  }
		}
	]
}


export const encrypt = async (key, tokenID) => {

	await litNodeClient.connect();

	const authSig = await LitJsSdk.checkAndSignAuthMessage({chain});
	const accessControlConditions = getAccessControlConditions(tokenID)

	const encryptRes = await LitJsSdk.encryptString(
		{
			accessControlConditions,
			authSig,
			chain,
			dataToEncrypt: key,
		},
		litNodeClient,
	);
	
	return {cif: encryptRes.ciphertext, data: encryptRes.dataToEncryptHash}

}