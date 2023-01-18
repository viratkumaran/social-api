const fs = require("fs");
var FB = require('fb');
var postschema = require("./post.model");
const { IgApiClient } = require("instagram-private-api")
const axios = require("axios")
const { readFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const objinsta = {
  username: "prithivi.1trooper",
  password: "123456780"
}
const { username, password } = objinsta
const ig = new IgApiClient()



// 17841408787760520/media?fields=id,media_type,media_url,username,caption,like_count,comments,timestamp
var postid
var accesstokenfb = 'EAAGEfpXqtNABAFko5E37GerGE6u2ZCTGX6Rv4kQeeTZB37ibktL3JYZAm64i6tifJ7KDiAdTZBJqyvQZBLUueTPsoNLV6ZBQYEbeamlJBhY62ZBJLQbByxQMxdlhQh6ZCZAUo5FQdkUVziEdNYFWZCE6pEZCPKK4zI79oux1ReVMs5phu5xqyZCMROwq'
function fbpost(req, res) {
  FB.setAccessToken(accesstokenfb);
  console.log(req.query, req.body)
  var body = 'My first post using facebook-node-sdk';

  FB.api('104901995709038/photos', 'post', { source: fs.createReadStream(`./uploads/${req.body.fileSource}`), caption: req.body.postName }, function (resp) {
    if (!resp || resp.error) {
      console.log(!resp ? 'error occurred' : resp.error);
      return;
    } else {
      console.log('Post Id: ' + resp.post_id);
      postid = resp.post_id

    }
  });
  if (postid != undefined) {
    res.send({ "suceess": "true" });
  } else {
    res.send({ "suceess": "false" });
  }
}
function fbpostsche(req, res) {

  var postschemaDetail = new postschema(req.body);
  console.log(req.body, "lllllllll");
  postschemaDetail.save(function (err, postschemaDetail) {
    if (err) {
      console.log("ERROR --", err);
      res.send("error saving postschemaDetail");
    } else {
      console.log(postschemaDetail);
      FB.setAccessToken(accesstokenfb);
      console.log(req.query, req.body)

      FB.api(`104901995709038/photos?published=false&&scheduled_publish_time=${req.body.timenew}`, 'post', { source: fs.createReadStream(`./uploads/${req.body.fileSource}`), caption: req.body.postName }, function (resp) {
        if (!resp || resp.error) {
          console.log(!resp ? 'error occurred' : resp.error);
          return;
        } else {
          console.log('Post Id: ' + resp.id);
          postid = resp.id

        }
      });
      res.json({ messge: "success", result: postschemaDetail, scheduledFB: postid });
    }
  });

  // if(postid != undefined){
  //   res.send({"suceess":"true"});
  // }else{
  //   res.send({"suceess":"false"});
  // }
}
async function instapost(req, res) {
  try {
    console.log("iam in")
    ig.state.generateDevice(username)
    await ig.simulate.preLoginFlow()
    const user = await ig.account.login(username, password)

    console.log("iam in")
    // uploading the image to instagram const path./photo.jpeg"
    const path = `./uploads/${req.body.fileSource}`;
    console.log("iam in")
    const published = await ig.publish.photo({

      file: await readFileAsync(path),

      caption: `${req.body.postName + "#" + "poprio009"}`

    })

    // console.log(published)
    postid = published.upload_id
    if (postid != undefined) {
      res.send({ "suceess": "true" });
    } else {
      res.send({ "suceess": "false" });
    }

  } catch (error) {

    console.log(error)

  }

}

function getpost(req, res) {
  console.log("getting all PhoneDetail", req.body);


  postschema.find({ isDeleted: false }).exec(function (err, getpostschema) {
    if (err) {
      res.send("error has occured");
    } else {
      res.json({ messge: "Success", result: getpostschema });
    }
  });
}
function linkedInPost(req, res) {
  let accessToken = "AQUFplQPvB7CvIBYMNk8fIrVSDXG4NcY18eppMwtnA97MwpF-wv7KNGuwbjct7K6DOzs1uu8u0_1ft9arW1JeK3-u7DjQo1ZoTIJ7Qyb_4xK0_2ZB_gL1qY-CHNTeimru5bm93aTVuWB6gZgxVh7vRVXXSBh8kLbaByAv_VXoP3dKZHITHzsweWPJrz_R8vAoAwbeDCakplth0T3D2TsPd3xsDjREpkzME-IRz3z0zUEG6V2rG72PcZD-z4GIX8KOdMHDibG1ItlYDumy5ApiXTFPMX4D904R_rtkUMQCOuXW2AcfaFbZDWQfkOCiHYzIHRXvx8tCaJPQTbcaBzis0rqZu5ilQ";
  let owner = "urn:li:person:fL7h34OrHB";
  const imgPath = `http://localhost:8000/images/${req.body.fileSource}`;
  console.log("path------------------", imgPath);
  let payload = {
    "owner": owner,
    "text": { "text": req.body.postName },
    // "content": {
    //   "contentEntities": [{
    //       "entityLocation": "https://zilliongamer.com/call-of-duty-mobile/c/weapon-guide/m13-stats-attachment-skins",
    //       "thumbnails": [{
    //           "resolvedUrl": "https://zilliongamer.com/uploads/codm/weapons/ar/m13/m13-cod-mobile-featured.jpg"
    //       }]
    //   }],
    //   "title": "See more..
    // }
    "content": {
      "contentEntities": [{
        "entityLocation": "http://localhost:4200/post",
        "thumbnails": [{
          "resolvedUrl": imgPath,
        }]
      }],
      "title": "See more..."
    }
  }
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
    'x-li-format': 'json'
  };
  axios({
    method: 'post',
    url: 'https://api.linkedin.com/v2/shares',
    data: payload,
    headers: headers
  })
    // axios.post({"url":'https://api.linkedin.com/v2/shares', "json":payload, "headers":headers})
    .then(function (response) {
      // console.log(response);
      res.send(response);
    })
    .catch(function (error) {
      // console.log(error);
      res.send(error);
    });
}
exports.fbpostsche = fbpostsche;
exports.fbpost = fbpost;
exports.instapost = instapost;
exports.getpost = getpost;
exports.linkedInPost = linkedInPost;
