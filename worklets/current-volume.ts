class CurrentVolumeProcessor extends AudioWorkletProcessor {
    public static readonly name: string = 'current-volume';

    public process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: Record<string, Float32Array>,
    ): boolean {
        console.log(inputs, outputs, parameters)
        for (let channel = 0; channel < outputs.length; ++channel) {
            outputs[channel] = inputs[channel];
        }

        return true;
    };
}

registerProcessor(CurrentVolumeProcessor.name, CurrentVolumeProcessor);
