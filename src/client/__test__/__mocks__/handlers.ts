// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('https://signing.gridpl.us/connect', (req, res, ctx) => {
    return res(
      ctx.json(
        {
          status: 200,
          message: '0100f714158200d7000104569be0c4c28526a3fc35e98356a1a1ae57d189ee8aac1e13099784947848a194bd8e032f931ed4189caf4bed017021b9d86e5f4496aa75839fcd588fe174312f000f0000d2a49ff62032325cb828849ea2cbc97e0e8a450d703ed6e22b4212fa31417c0e0798cda9279c2fb71a5db970e43c56689e6a82d8276ad8fa86c745073245889b981403e6b5d6dbaa76d006f9441db7b3c0ee60b301174280ea86846c58c66e2bcdbc53861bc2d0b8e4f00eeabf4b403dcf9f0359b1138095d82aac780b277a0c64b11531a773a6f3795427575732a91c79c1c1bb'
        }
      ))
  }),
  rest.post('https://signing.gridpl.us/getAddresses', (req, res, ctx) => {
    return res(
      ctx.json(
        {
          status: 200,
          message: '01007ae113e80d81005d7e3c5c5fcc334d75647f6955f11ce4edd1f3f8bfce13b48ed82ed6d8d0422defc84104ae1057f89243e8c1370afd096fc8a010c0a5eea430c88efbccf6eafd6467040a3564bc5efa2bdae668e5d26f567e46eccce7f18073bb46db66b3727876d236f83161859f465fa4f02971517d6d5564e891bc84c3a9ce933a417ff334ca02fb5cde3167a9a7729ec5fd4b796e65845dd20776c93e72c1ebf2017af84eb5692ef7b6dd33b6333bb3e91adbae08c78892086df311a45e0a81340b49b0fd8e9eb3e19dc517fcb62a63c287bdaad4278d67688e427c371ee29907ad60cb02ed8dab3724c2e527f88ca0b78229071f3daef4f58978819cc79674f2855f893b2f119a00a7c82a7375c62608c90c9ef4a8aa21f11216dff0837b81975e0f925699c05e53c81af9a561815e4252cda335b5c339c757c1f3953f7f3b396e623d421877841582c40feb7c88412d020378ae9c3fc483e10251b9eae658736bab57293aa3eaa89e10504b58d6a9299d154ada2795ae0d430631dce27887c32555e9ad5f23871068a1aadc74eca23dd53274ade295cca0adf8f7ef51690542964a38bea96ab9795f704c4b48b1b09d7fc153a412ec863dfad16a7eaecd4c72a4ba29fbc275e0e3aa62c1389c15123a4c92287e841c4541b22ff9fef39e8568bfba133376e6e8cf5139057e45e8a0a6f1c3ffd6414386eeeba0728b2ce9594f0dc45226eca74bb54fcfc06c227528c808e004e4ee5eb61550cb7973045ad9e680ca86675c062f562157e0b9d65ac1f6448d071ff2a808898f416b0a5313537d37741b9e2bdbef7ed936e48a78a6496e29782d559967d1e75204647cc2abc221c6911bb529e5df9a40f0262621ea6c599019d6c7426f63075cbcf1a2652a9ef23a2fef5be3449c8db6e554c5bcca1362425fc8a5b3da6c1b0e129d34a717a836d0861a6ee2c6bd8f9358208ffa194091f41c4b8f8296558cbe7b1b9af7453d3f75820a57a817e432a8a35313b3a4fc862335cec99b4cb6ab7e05e196b4d8eb5af255278cace5bade2d21265cc2b6187967bcafd1f586bf809ac385b5893842422a607782a290428592ebc2f42f8c3c76750f6a0b0d3d25ca9711a8fea1bdd501f6845cdb4e1e063fb07885114ec158eaada52d1b52ec25013db7c453e1fb8c8700b4f86fd88ba8a197074e1db5f9be62a0ca3fbc3684f17d7c3c4577456b667ad1b2f7ffdce6ee7222d03bff5efe7f38904fdb874b0086b5ececf30a514a565e7c0f49311ab1cd5be6f902227a94751136bc56294bcf4df261ac8eba8ff4d827434a7716d5cea9e9b7ef41946ebc2cfc34ac85732e196fab5d7ee4b0d3e6aec81d959687e861e7c28ec6316e6ed8e7c6d2791891e828e4011e460bbbb3c468fff6e4221e4d0d01804aa91c4caa1fdeab470802baebbf2a1891f8d1db4aef8ea1e405670554326dde1e2494345f2e584ce1c0e777aca36a9228b54464d03fbe59d356e6e8d3e63f401328ceb2126de76d15a1ddf2669f7a31e9a1706bd5d72dd51872c73373e1e21f4d020570c3033129c0744da84947ec54cd1ac6c42b86c379bbd527c5770f009ed10ba318c80a36a5c806e8c71c8b7e3847ee0893f8824e428bcddcef29062359a64917e2ca304498f464c54e0c771596240f983daf2ab96010172995c53b06e1d849791281195a461b128f0210dff3562c2128c48c63ab769c7c0d5c888a3a694bb8ec51bd450d343d195a97ba2d179596f2ab5b6b9d34b5931d5fdd42a3a5e3041521c56637b55f5a09f851cb1ffc08332248ac3bc79e734ea261caa0c2830c9451d07dcaa50b10424836bf09c97639df485a08ab363b7f13315497bc96d56b8f3e9bbf53f300920b0fca0ddfc6532aeeccc6e6e96fa13214f341ae93f8ff684755f7e181184479165e86b59e4763e83bc52580d4f5544fe11658660d1348e1a6062dcea6b0e40718e73e87a4b0f553a22cc11273f686bd74abdfb1fcd85ab2a919fd62ebe226949ab61e5607a4635336a4999c078f7aa4aaaab7739a97882ef9f4bbb1f03b1aa514e08ed936266d9da61fd7b5ce5d32f36f93ee3bc2a3ac41e27ffac15502aebf350387f9bf77ab1a6c3ff54871b8f855674602d491c3b9d0517e76d7ff23e66fbf4527f79dfc955cee7aa8e387a4f804a08cdb591e04a857d7d5ff9b937f0da73f906e252a17425f88fad9e2a8ff62122f909ee376661febf6974be67167138bcc0304bbd73454e80569709269bb9c25f575e85c68158ec2100f027bd20c0d96c3f9d0f6e59715d48799e30252d27c4c76e61f04fb252cd6694a4b6c695e197390f889e6f191da3d488f3214d8265a3b0df0462430d2bc85d1790e67a629721ef260647a852aa988b057414613e198c8515332f9cd34673328f4c678bf452980ccd46edf339cd743749e140a2aa57ed09864df95000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000422d50eb'
        }
      ))
  }),
]