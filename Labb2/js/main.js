// Denna fil innehåller lösningen till er uppgift.

"use strict";

var channelProperties = {}; //Key is channelID and their liveaudiolink and tagline will be their property.

document.addEventListener("DOMContentLoaded", function(){ //Waiting For DOM Content to load

    let xhr = new XMLHttpRequest(); //xhr Is Trying to interact with server. This must be called first
    xhr.open("GET", "http://api.sr.se/api/v2/channels?size=10&format=json", true); //Get Data From SRC Asynchronously
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){ //The request is Done and status is Okay!
            let channelData = JSON.parse(xhr.responseText); //Recieve Information In JSON format
            var chnImgOutput = ''; //Variable Where Image of Channel is being stored
            var chnNameOutput = ''; //Variable where Name of Channel is being stored
            
            for(var i in channelData.channels){ //Iterate through JSON data
                chnImgOutput +=  //Used to Recieve Images and names of all RadioChannels 
                '<li id="'+channelData.channels[i].id+'">' +
                '<img src="'+channelData.channels[i].image+'"width="65" height="65">' +
                ''+channelData.channels[i].name+'</li>';
                
                chnNameOutput += //Used to populate searchlist with channels Name
                '<option value='+channelData.channels[i].id+'>' +
                ''+channelData.channels[i].name+'' +
                '</option>';
            
                channelProperties[channelData.channels[i].id] = {"tagline": channelData.channels[i].tagline, "liveaudiolink": channelData.channels[i].liveaudio.url};
            }
            
            document.getElementById("mainnavlist").innerHTML = chnImgOutput; //Makes Information Visible on Website
            document.getElementById("searchProgram").innerHTML = chnNameOutput; //Makes Information Visible on Website
        }
        
        if(this.status == 404){ //Status is Not Okay!
            alert("File is Not Found!");
        }
    };
    
    xhr.send(); //Sends the request. The request is asynchronous 

    //////////////////////////////////////////////////// 
    
    /*
        Function Below, Operates on Searchbutton ("Visa Programtablå")
    */

    document.getElementById('searchbutton').addEventListener("click", function(){ //When serachbutton is clicked - do the following
        let chnID = document.getElementById("searchProgram").value; //Used to get ChannelID From Search List
        let xhr2 = new XMLHttpRequest(); //xhr2 Is Trying to interact with server. This must be called first
        xhr2.open("GET", "http://api.sr.se/api/v2/scheduledepisodes?channelid="+ chnID + "&format=json", true); //Get Data From SRC Asynchronously
        
        xhr2.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){ //The request is Done and status is Okay!
                let channelData = JSON.parse(xhr2.responseText); //Recieve Information In JSON format
                var chnInfoOutput = ''; //Variable where Title and Description will be stored
                
                for(var i in channelData.schedule){ //Iterate Through Every Info About Channel (JSON data)
                    chnInfoOutput +=
                    '<h1>'+channelData.schedule[i].title+'</h1>' + //Title of Info
                    '<p>"'+channelData.schedule[i].description+'"</p>'; //Description Below Title
                }
                
                document.getElementById("info").innerHTML = chnInfoOutput; //Change Info div to appropiate Information about Selected Channel
            }
            
            if(this.status == 404){ //Status is Not Okay!
                alert("File is Not Found!");
            }
        };
        
        xhr2.send(); //Sends the request. The request is asynchronous
    });

    //////////////////////////////////////////////////// 

    /*
        Function Below, Operates on Recieving Live Audio From Selected RadioChannels in "mainnavlist"
    */

    document.getElementById("mainnavlist").addEventListener("click", function(e){
        let chnID = e.target.id; //Used to get ChannelID From MainNavList
        console.log(chnID);
        let xhr3 = new XMLHttpRequest();
        xhr3.open("GET", "http://api.sr.se/api/v2/playlists/rightnow?channelid=" + chnID + "&format=JSON" , true);

        xhr3.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){ //The request is Done and status is Okay!
                let channelData = JSON.parse(xhr3.responseText); //Recieve Information In JSON format
                
                let previousSong = "-"; //Variable to store Data about previous song
                var nextSong = "-"; //Variable to store Data about next song
                
                if(channelData.playlist.hasOwnProperty('previoussong')){ //A check if previous song exists
                    previousSong = channelData.playlist.previoussong.artist + " - " + channelData.playlist.previoussong.title;
                }
                if(channelData.playlist.hasOwnProperty('nextsong')) { //A check if next song exists
                    nextSong = channelData.playlist.nextsong.artist + " - " + channelData.playlist.nextsong.title;
                }

                var audioElement; //Variable to create an audio element to play music from current song
                var channelDescription = ""; //Variable to store a brief channel description (What Channel, Info, Next song, Prev song)
                
                channelDescription +=  //Building interface for music page
                    '<h1>'+channelData.playlist.channel.name+'</h1>' +
                    '<p><strong>'+channelProperties[chnID].tagline+'</strong></p>' +
                    '<p>Previous Song: <strong>'+previousSong+'</strong></p>' +
                    '<p>Next Song: <strong>'+nextSong+'</strong></p>';
                audioElement += //Building interface so music can be broadcasted
                    '<audio src="'+channelProperties[chnID].liveaudiolink+'" autoplay>' +
                    '<embed src="'+channelProperties[chnID].liveaudiolink+'" hidden="true"></audio>';
        
                document.getElementById('info').innerHTML = channelDescription; //Make Website Come Alive with interface being built
                document.getElementById('info').innerHTML += audioElement; //Make Website Have Audio When Criterias are met
            }

            if(this.status == 404){ //Status is Not Okay!
                alert("File is Not Found!");
            }
        };

        xhr3.send(); //Sends the request. The request is asynchronous
    });


});