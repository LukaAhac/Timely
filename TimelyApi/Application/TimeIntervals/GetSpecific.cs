using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Application.Core;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Application.TimeIntervals
{
    public class GetSpecific
    {
        public class Query : IRequest<Result<TimeInterval>>
        {
            public Guid id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<TimeInterval>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<TimeInterval>> Handle(Query request, CancellationToken cancellationToken)
            {
               return Result<TimeInterval>.Success(await _context.TimeIntervals.FindAsync(request.id));
            }
        }
    }
}