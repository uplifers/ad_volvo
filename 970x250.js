(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.cta_btn = function() {
	this.initialize(img.cta_btn);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,347,99);


(lib._img = function() {
	this.initialize(img._img);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,970,654);


(lib.volvo = function() {
	this.initialize(img.volvo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,297,26);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.clicktagBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg43AHCIAAuDMBxvAAAIAAODg");
	this.shape.setTransform(364,45);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,728,90);


(lib.txt3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(237.25,143.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.txt3, new cjs.Rectangle(-38.4,106.1,561.9,64), null);


(lib.txt2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A/ZR+IATg/QAwAVAwAAQAvAAAAgjIACgdIgBAAQgYAfgygBQgzABgdgkQgdgiAAg7QAAg6AggkQAhgmA1AAQAxABAXAiIAAAAIADgbIBJAAQgEAsAABSIAAB0QAABqiAAAQhAAAgygUgA+LOBQgNASAAAeQAAAdANASQAOATAYAAQAVAAAOgSQANgSAAgdIAAgCQAAgegNgSQgOgSgXAAQgXABgNASgATPSLIAohaIgRAAIhXj7IBZAAIAdBiQAOAvAFAgIACAAIAsixIBZAAIh2FVgADjSLQAWgWAAgLQAAgIgSgMIASggQgugGgogXIAbg6QAvAdAvgBQAhAAAAgQQAAgNgXgFIgygKQhJgQAAg9QAAgnAdgWQAegWA1gBQA3ABAtAWIgaA4QgigUgpAAQgeAAAAAPQAAAMAXAFIAzAKQBKAQAAA+QAAAjgYAXQgXAWgqAGIgGAKQAWARAAASQAAAVgYASgA3nSLQAWgWAAgLQAAgIgSgMIASggQgugGgogXIAbg6QAvAdAvgBQAhAAAAgQQAAgNgXgFIgygKQhJgQAAg9QAAgnAdgWQAegWA1gBQA3ABAtAWIgaA4QgigUgpAAQgeAAAAAPQAAAMAXAFIAzAKQBKAQAAA+QAAAjgYAXQgXAWgqAGIgGAKQAWARAAASQAAAVgYASgAezPQIAAiaIBQAAIAAB9QAAAoAFALQAKATAXAAQATAAAMgMQAQgQAAgpIAAh+IBQAAIABD7IhKAAIgBgeIgBAAQgaAlgzABQhdAAAAhpgAXSQXQglgjAAhAQAAg/AngkQAlgjA8AAQA+AAAjAiQAlAjAABAQAAA+gmAlQgmAig8ABQg9gBgkghgAYQODQgOASAAAeQAAAgAOASQANARAXAAQAYAAANgRQANgSAAggQAAgfgNgRQgNgSgYAAQgXAAgNASgAN9QlQgTgUABguIAAhtIgfAAIAAhAIAfAAIAAhFIBQgOIAABTIA2AAIAABAIg2AAIAABRQAAAjAGAHQAFAFAMAAQASAAANgEIAAA+QgWAJgfAAQgsgBgTgTgAJOQhQgVgVAAgiQAAhYCfAAIAAgFQAAgjgsAAQgrAAghAcIghgwQAzgoBEAAQByAAAABfIAAAtIABB3IhKAAIgBgaIgBAAQgdAhgvABQgrAAgYgYgAKaPPQgOAGAAAQQAAAXAcAAQATAAAOgMQAPgOAAgWIAAgFQgtAAgRAIgAhfQhQgWgVAAgiQAAhYCeAAIAAgFQAAgjgqAAQgrAAghAcIgigwQA0goBDAAQBxAAAABfIAAAtIACB3IhLAAIgBgaIAAAAQgdAhguABQgsAAgXgYgAgTPPQgOAGAAAQQAAAXAbAAQASAAAOgMQAPgOAAgWIAAgFQgrAAgRAIgAlNQVIgBAAIgBAcIhKAAQADhHAAg4IAAjhIBQAAIAABQQAAAYgEAYIABAAQAZgiAzgBQAzAAAeAmQAcAkAAA7QAAA8ggAkQggAmg1AAQgyAAgWgkgAk6N/QgNASAAAgIAAAHQAAAcANATQANARAXABQAYgBANgSQAMgTAAggQAAgfgNgSQgNgTgYgBQgWAAgNARgEgjvAQXQglgjAAhAQAAg/AmgkQAlgjA8AAQA8ABAiAhQAiAiAAA/IgCAcIivAAQAIAvA1gBQAtABAjgaIAcA0Qg0Aig/ABQhCgBglghgEghhAOYQgDgvgqABQgogBgIAvIBdAAIAAAAgEgouAQTQgdgkAAg7QAAg8AggkQAhgmA1AAQAsAAAWAcIAAAAIgCh5IBQAAIAADiIACB+IhLAAIgBgeIAAAAQgaAlg1ABQgzAAgdgmgEgnpAOCQgNASAAAfQAAAfANATQAOAUAYAAQAWgBANgQQANgSAAggIAAgGQAAgegNgSQgOgSgXAAQgXAAgNAUgEAn1AQxIAAhcIBeAAIAABcgEAjeAQxIAAhBIBvh7IhpABIAAhAIDUAAIAABAIhvB7IB1gBIAABBgAbsQxIgCj7IBKAAIACAqIABAAQAbgyAwAAIARABIAABQIgTgBQggAAgQAQQgNANgEAVQgDAOAAAiIAABRgAQgQxIAAj7IBQAAIAAD7gAG9QxIAAlgIBQAAIAAFggAqmQxIAAj7IBQAAIAAD7gAsyQxIAAh+QAAgngFgLQgKgSgXgBQgTAAgMAMQgQAQAAApIAAB+IhQAAIAAh+QAAgngFgLQgJgSgYgBQgTAAgMAMQgQAQAAApIAAB+IhQAAIgBj7IBKAAIABAfIABAAQAagnAzAAQA3AAAYApQAggpA2AAQBdAAAABpIAACagA0NQxIAAj7IBQAAIAAD7gA6mQxIAAj7IBQAAIAAD7gAqmMcIAAhLIBRAAIAABLgA0NMcIAAhLIBRAAIAABLgA6mMcIAAhLIBRAAIAABLgA++LHIA8AAQAAAcAdAAQAcAAAAgcIA8AAQAABUhZAAQhYAAAAhUgA8kImIATg/QAvAVAwAAQAwAAAAgkIABgcIgBAAQgYAfgxAAQg0gBgdgiQgcgjAAg8QAAg5AggkQAhglA0AAQAyAAAWAjIABAAIACgbIBKAAQgEArAABTIAABzQAABpiBAAQg/ABgygUgA7XEpQgMASAAAeQAAAdANASQANATAYABQAWgBANgSQANgSAAgeIAAgCQAAgdgNgRQgNgTgXABQgYAAgNASgAGLIyQAWgVAAgLQAAgIgSgMIAUgiQgsgKgYghQgagiAAgzQAAg/AmgkQAlgjA6ABQBeAAAYBMIhJAbQgJgmgkAAQgWAAgNASQgNARAAAgQAAAfANASQANATAXAAQAggBAOglIBKAWQggBHhEAJIgGAJQAWARAAATQAAAUgYASgAnrG/QglgjAAhAQAAg/AmgkQAlgjA8ABQA8AAAiAgQAiAjAAA/IgCAcIivAAQAIAuA1AAQAtAAAjgZIAcA0Qg0Aig/AAQhCAAglghgAldFAQgDgvgqAAQgoAAgIAvIBdAAIAAAAgAr+G9QgkgjAAg+QAAg/AmgkQAlgjA6ABQBeAAAYBMIhJAbQgJgmgkAAQgWAAgNARQgNASAAAgQAAAeANATQANATAXAAQAggBAOglIBKAWQgmBRhVAAQg8ABgjgkgAwkG/QglgjAAhAQAAg/AmgkQAlgjA8ABQA8AAAiAgQAiAjAAA/IgCAcIivAAQAIAuA1AAQAtAAAjgZIAcA0Qg0Aig/AAQhCAAglghgAuWFAQgDgvgqAAQgoAAgIAvIBdAAIAAAAgA3cG/QgmgjAAhAQAAg/AngkQAlgjA8ABQA8AAAhAgQAjAjAAA/IgDAcIivAAQAIAuA2AAQAtAAAjgZIAbA0Qg0Aig+AAQhDAAgkghgA1PFAQgCgvgqAAQgoAAgIAvIBcAAIAAAAgEgnyAG9IAAAAIgCAbIhKAAQAEhHAAg3IAAjhIBQAAIAABQQAAAYgEAZIABAAQAZgjAzAAQAzAAAdAlQAdAkAAA7QAAA7ggAlQghAlg1AAQgxABgXgkgEgnfAEoQgNASAAAeIAAAIQAAAdANARQAOASAXAAQAXAAANgSQANgTAAggQAAgegNgTQgOgTgYAAQgWgBgNASgAOfHYIAAh9QAAgngFgLQgJgSgZAAQgUAAgLALQgRARAAAoIAAB9IhQAAIgBj5IBKAAIABAeIABAAQAagmA0AAQBeAAAABnIAACagAJnHYIAAj5IBQAAIAAD5gADFHYIAAj5IBQAAIAAD5gAgxHYIg+hnIgZAaIAABNIhQAAIAAlfIBQAAIAAC3IBIhRIBhAAIhVBXIBiCigAzKHYIAAlfIBQAAIAAFfgEghzAHYIgBj5IBKAAIACAoIAAAAQAcgxAvABIASABIAABPIgTgBQghAAgQAQQgNANgEAUQgDAPAAAiIAABQgEgkEAHYIAAj5IBQAAIAAD5gAJnDFIAAhMIBRAAIAABMgADEDFIAAhMIBRAAIAABMgEgkEADFIAAhMIBRAAIAABMgANJiLQgSgUAAgtIAAhtIgeAAIAAg/IAeAAIAAhGIBQgOIAABUIA2AAIAAA/Ig2AAIAABRQAAAjAGAHQAGAFAMAAQARAAANgDIAAA9QgWAJgfAAQgsAAgTgVgAD/iYQgmgiAAhBQAAg+AnglQAlgiA8gBQA8AAAhAiQAjAiAAA/IgDAcIivAAQAIAvA2AAQAtgBAjgZIAbA0Qg0Ajg+AAQhDAAgkgigAGMkXQgCgugqAAQgoAAgIAuIBcAAIAAAAgAi5iYQglgiAAhBQAAg+AmglQAlgiA8gBQA8AAAhAiQAiAiAAA/IgCAcIiuAAQAIAvA1AAQAtgBAigZIAcA0QgzAjg/AAQhCAAglgigAgrkXQgDgugqAAQgoAAgIAuIBdAAIAAAAgAuSiYQgmgiAAhBQAAg+AnglQAlgiA8gBQA8AAAhAiQAjAiAAA/IgDAcIivAAQAIAvA2AAQAtgBAjgZIAbA0Qg0Ajg+AAQhDAAgkgigAsFkXQgCgugqAAQgoAAgIAuIBcAAIAAAAgA6TiOQgVgVAAgiQAAhYCfAAIAAgFQAAgjgsAAQgrAAghAcIghgwQAzgoBEAAQByAAAABfIAAAtIABB3IhKAAIgBgaIgBAAQgdAigvAAQgrAAgYgYgA5HjgQgOAHAAAOQAAAYAcAAQATAAAOgNQAPgNAAgWIAAgFQgtAAgRAIgEgl+gCOQgWgVAAgiQAAhYCfAAIAAgFQAAgjgrAAQgrAAghAcIgigwQA0goBEAAQBxAAAABfIAAAtIACB3IhLAAIgBgaIAAAAQgdAigvAAQgsAAgXgYgEgkygDgQgOAHAAAOQAAAYAbAAQATAAAOgNQAPgNAAgWIAAgFQgsAAgRAIgEgohgCLQgTgUABgtIAAhtIgfAAIAAg/IAfAAIAAhGIBQgOIAABUIA2AAIAAA/Ig2AAIAABRQAAAjAGAHQAFAFAMAAQASAAANgDIAAA9QgWAJgfAAQgsAAgTgVgAb5h+IAAj6IBQAAIAAD6gAZoh+IAAlfIBQAAIAAFfgAXwh+Ig9hoIgaAaIAABOIhQAAIAAlfIBQAAIAAC2IBIhRIBjAAIhXBXIBjCjgAS4h+IAAj6IBQAAIAAD6gAPsh+IgBj6IBKAAIACAoIAAAAQAcgwAvgBIASABIAABQIgTgBQghAAgQAQQgNANgEAUQgDAPAAAiIAABRgAK4h+Ig9hoIgaAaIAABOIhQAAIAAlfIBQAAIAAC2IBIhRIBjAAIhXBXIBjCjgABZh+IAAlfIBQAAIAAFfgAnZh+IAAh9QAAgogFgLQgJgTgZAAQgUAAgLAMQgRAQAAApIAAB+IhQAAIgBj6IBKAAIABAdIABAAQAagmA0AAQBeAAAABpIAACagAwzh+IAAh9QAAgogGgLQgJgTgYAAQgTAAgLAMQgQAQAAApIAAB+IhQAAIAAh9QAAgogGgLQgJgTgYAAQgTAAgLAMQgQAQAAApIAAB+IhQAAIgCj6IBKAAIACAdIAAAAQAagmA0AAQA3AAAYAoQAfgoA3AAQBdAAAABpIAACagA8fh+IAAh9QAAgogFgLQgKgTgXAAQgTAAgMAMQgQAQAAApIAAB+IhQAAIAAh9QAAgogFgLQgJgTgYAAQgTAAgMAMQgQAQAAApIAAB+IhQAAIgBj6IBKAAIABAdIABAAQAagmAzAAQA3AAAYAoQAggoA2AAQBdAAAABpIAACagAb5mTIAAhKIBRAAIAABKgAS4mTIAAhKIBRAAIAABKgAssp9IAohaIgRAAIhXj6IBZAAIAdBiQAOAvAFAgIACAAIAsixIBZAAIh2FUgEgltgJ9QAVgVAAgLQAAgIgRgMIASggQgugGgpgXIAcg6QAuAdAwgBQAhAAAAgQQAAgNgXgFIgzgKQhJgQAAg9QAAgnAegWQAegWA1gBQA2ABAtAWIgZA3QgjgTgoAAQgeAAAAAPQAAAMAXAFIAyAKQBKAQAAA+QAAAjgXAXQgYAWgqAGIgFAKQAWARAAASQAAAVgYARgAFKrwQgmgjAAhAQAAg/AngkQAlgjA8AAQA8ABAhAgQAjAjAAA/IgDAcIivAAQAIAvA2gBQAtABAjgaIAbA0Qg0Aig+ABQhDgBgkghgAHXtvQgCgvgqABQgogBgIAvIBcAAIAAAAgAAKr0QgbgkAAg7QAAg8AfgkQAggmA1AAQAsAAAWAcIABAAIgCh4IBQAAIAADhIABB9IhKAAIgBgdIgBAAQgaAlg0ABQgzAAgegmgABPuFQgMASAAAfQAAAfANATQANAUAYAAQAWgBANgQQANgSAAggIAAgGQAAgdgNgTQgNgSgXAAQgYAAgNAUgApCs3IAAiaIBQAAIAAB9QAAAoAFALQAKATAXAAQATAAAMgMQAQgQAAgpIAAh+IBQAAIABD6IhKAAIgBgdIgBAAQgaAlgzABQhdAAAAhpgAz/s3IAAiaIBQAAIAAB9QAAAoAFALQAKATAXAAQATAAAMgMQAQgQAAgpIAAh+IBQAAIABD6IhKAAIgBgdIgBAAQgaAlgzABQhdAAAAhpgA3oryIgBAAIgBAbIhKAAQADhGAAg3IAAjhIBQAAIAABPQAAAYgEAYIABAAQAZgiAzgBQAzAAAeAmQAcAkAAA7QAAA8ggAkQggAmg1AAQgyAAgWgkgA3VuIQgNASAAAgIAAAHQAAAcANATQANARAXABQAYgBANgSQAMgTAAggQAAgfgNgSQgNgTgYgBQgWAAgNARgA/CrwQgmgjAAhAQAAg/AngkQAlgjA8AAQA8ABAhAgQAjAjAAA/IgDAcIivAAQAIAvA2gBQAtABAjgaIAbA0Qg0Aig+ABQhDgBgkghgA81tvQgCgvgqABQgogBgIAvIBcAAIAAAAgEgh6gLiQgTgUABguIAAhtIgfAAIAAhAIAfAAIAAhFIBQgOIAABTIA2AAIAABAIg2AAIAABRQAAAjAGAHQAFAFAMAAQASAAANgEIAAA+QgWAJgfAAQgsgBgTgTgAMDrXIAAh9QAAgngFgLQgJgSgZgBQgUAAgLAMQgRAQAAApIAAB9IhQAAIgBj6IBKAAIABAfIABAAQAagnA0AAQBeAAAABpIAACZgAkXrXIAAhAIBvh7IhpABIAAhAIDUAAIAABAIhvB7IB1gBIAABAgEgo3gLXIAAlVIBXAAIAAFVgAm0vrIAAhKIBLAAIAABKgAoivrIAAhKIBLAAIAABKgEgo2gRGIAAhKIBWAAIAABKg");
	this.shape.setTransform(295.175,189.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.txt2, new cjs.Rectangle(28,66,549.7,244), null);


(lib.txt1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(265.35,187.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.txt1, new cjs.Rectangle(-30,123,605.3,125), null);


(lib.img1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.instance = new lib._img();
	this.instance.setTransform(0,78);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.img1, new cjs.Rectangle(0,78,970,654), null);


(lib.cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.cta_btn();
	this.instance.setTransform(-24,59,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cta, new cjs.Rectangle(-24,59,173.5,49.5), null);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#07516E").s().p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	this.shape.setTransform(485,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg, new cjs.Rectangle(0,0,970,250), null);


(lib.mcContentPanel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// stroke
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#878685").ss(1,1,1).p("EhLxgThMCXjAAAMAAAAnDMiXjAAAg");
	this.shape.setTransform(485,125);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},392).wait(7));

	// volvo_logo.png
	this.instance = new lib.volvo();
	this.instance.setTransform(788,211,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(399));

	// cta
	this.instance_1 = new lib.cta();
	this.instance_1.setTransform(150,66,1,1,0,0,0,84,24);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(300).to({_off:false},0).to({alpha:1},28,cjs.Ease.get(1)).wait(38).to({alpha:0},25,cjs.Ease.get(-1)).to({_off:true},1).wait(7));

	// solidbg
	this.instance_2 = new lib.bg();
	this.instance_2.setTransform(364,45,1,1,0,0,0,364,45);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(281).to({_off:false},0).to({alpha:1},20,cjs.Ease.get(1)).wait(72).to({alpha:0},25).wait(1));

	// txt3
	this.instance_3 = new lib.txt3();
	this.instance_3.setTransform(150.15,63.85,0.5,0.5,0,0,0,183.9,23.7);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(208).to({_off:false},0).to({alpha:1},28,cjs.Ease.get(1)).wait(38).to({alpha:0},25,cjs.Ease.get(-1)).to({_off:true},1).wait(99));

	// txt2
	this.instance_4 = new lib.txt2();
	this.instance_4.setTransform(150.2,52.7,0.5,0.5,0,0,0,246.2,45.2);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(94).to({_off:false},0).to({alpha:1},28,cjs.Ease.get(1)).wait(64).to({alpha:0},25,cjs.Ease.get(-1)).to({_off:true},1).wait(187));

	// txt1
	this.instance_5 = new lib.txt1();
	this.instance_5.setTransform(149,53.1,0.5,0.5,0,0,0,188,46.2);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},28,cjs.Ease.get(1)).wait(44).to({alpha:0},25,cjs.Ease.get(-1)).to({_off:true},1).wait(301));

	// img1
	this.instance_6 = new lib.img1();
	this.instance_6.setTransform(254,57.5,1,1,0,0,0,254,135.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-258.5},300).to({_off:true},65).wait(34));

	// img1
	this.instance_7 = new lib.img1();
	this.instance_7.setTransform(254,57.5,1,1,0,0,0,254,135.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(366).to({_off:false},0).wait(33));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-316,972,970);


// stage content:
(lib._970x250 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var m = this.mcContentPanel;
		var loopTime = 99999999999999999,
		loopFrame = m.totalFrames-1,
		stopFrame = 340,
		loopCount = 0;
		
		this.addEventListener("tick", onTick);
		function onTick(){
			if(loopCount+1 < loopTime){
				if(m.currentFrame == loopFrame){
					loopCount++;
					m.gotoAndPlay(0);
				}
			}else if(m.currentFrame+1 == stopFrame){
				m.gotoAndStop(stopFrame);
			}
		}
		this.clicktagBtn.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			if (typeof clickTag != "undefined") {
				console.log(clickTag)
				window.open(clickTag, "_blank");
			}else if(typeof clickTAG != "undefined"){
				console.log(clickTAG)
				window.open(clickTAG, "_blank");
			}
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// clicktagBtn
	this.clicktagBtn = new lib.clicktagBtn();
	this.clicktagBtn.name = "clicktagBtn";
	this.clicktagBtn.setTransform(485,125.05,1.3321,2.7733,0,0,0,364.1,45.1);
	new cjs.ButtonHelper(this.clicktagBtn, 0, 1, 2, false, new lib.clicktagBtn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.clicktagBtn).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhLxATiMAAAgnDMCXjAAAMAAAAnDg");
	mask.setTransform(485,125);

	// mcContentPanel
	this.mcContentPanel = new lib.mcContentPanel();
	this.mcContentPanel.name = "mcContentPanel";
	this.mcContentPanel.setTransform(150,300,1,1,0,0,0,150,300);

	var maskedShapeInstanceList = [this.mcContentPanel];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.mcContentPanel).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(485,125,485,125);
// library properties:
lib.properties = {
	id: '590A475C74594D839CA3C8343D9E26B5',
	width: 970,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"/images/cta_btn.png?1617738245562", id:"cta_btn"},
		{src:"/images/_img.jpg?1617738245562", id:"_img"},
		{src:"/images/volvo.png?1617738245562", id:"volvo"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['590A475C74594D839CA3C8343D9E26B5'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;