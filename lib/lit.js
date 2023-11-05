import * as LitJsSdk from "@lit-protocol/lit-node-client";

const chain = "optimism"
const litNodeClient = new LitJsSdk.LitNodeClient({
	litNetwork: 'cayenne',
});


const getAccessControlConditions = (id) => {
	return [
		{
		  contractAddress: '0x513D41b00E4213024327D6FCcfFcaE58cF69B6Aa',
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
	
	return {cif: encryptRes.ciphertext, hash: encryptRes.dataToEncryptHash}

}