interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
}

interface FeaturedActivitiesProps {
  region: string;
  activities: FeaturedActivity[];
}

export default function FeaturedActivities({
  region,
  activities,
}: FeaturedActivitiesProps) {
  return (
    <section className="bg-white/20 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            本季热门活动
          </h2>
          <p className="text-gray-600">为您精选{region}当前最受欢迎的活动</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {activities.map(activity => (
            <div
              key={activity.id}
              className="overflow-hidden rounded-xl border-2 border-gray-300/40 bg-white/90 shadow-md shadow-black/10 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-black/15"
            >
              {/* 1:1 图片预留区域 */}
              <div
                className={`aspect-square bg-gradient-to-br ${activity.bgColor} flex items-center justify-center`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/10">
                  <span className="text-sm text-gray-500">照片预留区域</span>
                </div>
              </div>
              {/* 文字内容区域 */}
              <div className="p-6">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                  <span className="text-3xl">{activity.emoji}</span>
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
