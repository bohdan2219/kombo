import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

//pages
import { IdlePage } from '../idle/idle';
import { EditPage } from '../edit/edit';
 
//classes
import { GestureType } from '../../classes/gesture-type';
import { Variables } from '../../classes/variables';

//json
import * as soundsData from '../../assets/sounds/sounds.json';

//services
import { GesturesService } from '../../services/gestures.service';

//server
import { Socket } from 'ng-socket-io';

import * as audio from 'waves-audio';
const audioContext = audio.audioContext;
const audioScheduler = audio.getScheduler();

@Component({
	selector: 'page-switch-sound',
	templateUrl: 'switch-sound.html'
})

export class SwitchSoundPage {
	lookOfEvents:Array<GestureType> = [GestureType.IDLE_IN];
	sound_list:Array<any>;

	constructor(
		private zone:NgZone,
		private navCtrl: NavController,
		public navParams: NavParams,
		private events:Events,
		public globalVars: Variables,
		private gesturesService:GesturesService,
		private socket:Socket) {

		this.gesturesService.watchForGesture(this.lookOfEvents);
		events.subscribe(GestureType.IDLE_IN.toString(), (acceleration) => {
			this.gesturesService.stopGestureWatch(this.events, GestureType.IDLE_IN);
			zone.run(() => {
				navCtrl.setRoot(IdlePage);
			});
		});

		this.sound_list = soundsData[0];

	}

	selectSound(sound) {
		if(sound.focus) {
			this.globalVars.currentSoundType = sound.id;
			console.log(this.globalVars.currentSoundType);
			this.navCtrl.setRoot(EditPage);
		} else {
			this.sound_list.forEach(function(s, i) {
				s.focus = false;
			});
			sound.focus = true;
			this.playSound(sound.id);
		}
	}

	playSound(type:number) {
		// Get Time from Server
		// const time = audioScheduler.currentTime;	                            // Sync Time
		// const src = audioContext.createBufferSource();                          // Create Source
		// const gainC = audioContext.createGain();

		// // Play Audio File
		// gainC.connect(audioContext.destination);
		// src.connect(gainC);                                  					// Connect Audio Context
		// src.buffer = this.globalVars.buffers[type];                             // Define witch sound the function is playing
		// console.log(time);
		// src.start(time, 0 * 3, 1 * 0.25 + 0.1);									// Start Sound
		// src.start(time, 1 * 3, 1 * 0.25 + 0.1);									// Start Sound
		// src.start(time, 2 * 3, 1 * 0.25 + 0.1);									// Start Sound
		// src.start(time, 3 * 3, 1 * 0.25 + 0.1);									// Start Sound
		// src.start(time, 4 * 3, 1 * 0.25 + 0.1);									// Start Sound
		// gainC.gain.value = this.decibelToLinear(this.globalVars.soundGains[type]);

		// gainC.gain.setTargetAtTime(0, time + 1 * 0.25 - 0.05, 0.015);
	}


    ionViewWillLeave() {
        console.log('will close emoji');
    }

    ionViewDidLeave() {
        console.log('closed emoji');
    }

}
