exports.calculateActiveContent = (contents) => {
    const now = new Date();
    const liveContents = contents.filter(c => 
        c.start_time && c.end_time && now >= new Date(c.start_time) && now <= new Date(c.end_time)
    );

    if (liveContents.length === 0) return null;

    const totalCycle = liveContents.reduce((sum, item) => sum + item.duration, 0);
    const currentMinutes = Math.floor(now.getTime() / 60000) % totalCycle;

    let accumulated = 0;
    for (const item of liveContents) {
        accumulated += item.duration;
        if (currentMinutes < accumulated) return item;
    }
    return liveContents[0];
};